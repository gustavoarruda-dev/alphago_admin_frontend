import { toPng } from 'html-to-image';

export type ExportThemeMode = 'light' | 'dark';

export function getExportThemeMode(): ExportThemeMode {
  const root = document.documentElement;
  const datasetTheme = root.dataset.theme;
  if (datasetTheme === 'light' || datasetTheme === 'dark') return datasetTheme;
  return root.classList.contains('dark') ? 'dark' : 'light';
}

function getExportBackgroundColor(): string {
  return getExportThemeMode() === 'dark' ? '#000000' : '#ffffff';
}

function getExportPdfBackgroundRgb(): [number, number, number] {
  return getExportThemeMode() === 'dark' ? [0, 0, 0] : [255, 255, 255];
}

function findExportContainer(element: HTMLElement): HTMLElement {
  const card = element.closest('.card-gradient-bg');
  return (card instanceof HTMLElement ? card : element) as HTMLElement;
}

function sanitizeFileNamePart(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length === 0) return 'export';
  return trimmed
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
    .replace(/-+/g, '-')
    .replace(/^[-_]+|[-_]+$/g, '')
    .slice(0, 120);
}

function downloadDataUrl(dataUrl: string, fileName: string): void {
  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = fileName;
  anchor.rel = 'noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  try {
    downloadDataUrl(url, fileName);
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

const TRANSPARENT_PNG_DATA_URL =
  'data:image/png;base64,' +
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO3ZpWcAAAAASUVORK5CYII=';

function shouldIgnoreElement(element: Element): boolean {
  if (!(element instanceof HTMLElement)) return false;
  if (element.closest('[data-export-ignore="true"]')) return true;
  if (element.closest('[data-radix-popper-content-wrapper]')) return true;
  const isTableHeader = !!element.closest('thead') || !!element.closest('th');
  const tag = element.tagName.toLowerCase();
  if (tag === 'button') return !isTableHeader;
  if (tag === 'input' || tag === 'select' || tag === 'textarea') return true;
  const role = element.getAttribute('role');
  if (role === 'button') return !isTableHeader;
  return false;
}

function shouldIncludeNode(node: Node): boolean {
  if (node.nodeType !== Node.ELEMENT_NODE) return true;
  return !shouldIgnoreElement(node as Element);
}

async function nextFrame(): Promise<void> {
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

async function getImageSize(dataUrl: string): Promise<{ width: number; height: number }> {
  await nextFrame();
  return await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () =>
      reject(new Error('Não foi possível carregar a imagem gerada para exportação.'));
    image.src = dataUrl;
  });
}

export async function exportElementAsPng(params: {
  element: HTMLElement;
  baseFileName: string;
}): Promise<void> {
  const captureElement = findExportContainer(params.element);
  const base = sanitizeFileNamePart(params.baseFileName);
  const fileName = base.endsWith('.png') ? base : `${base}.png`;

  const rect = captureElement.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));

  const dataUrl = await toPng(captureElement, {
    cacheBust: true,
    backgroundColor: getExportBackgroundColor(),
    fontEmbedCSS: '',
    imagePlaceholder: TRANSPARENT_PNG_DATA_URL,
    pixelRatio: Math.min(2, window.devicePixelRatio || 2),
    width,
    height,
    style: { width: `${width}px`, height: `${height}px` },
    filter: shouldIncludeNode,
  });

  downloadDataUrl(dataUrl, fileName);
}

export async function exportElementAsPdf(params: {
  element: HTMLElement;
  baseFileName: string;
}): Promise<void> {
  const captureElement = findExportContainer(params.element);
  const base = sanitizeFileNamePart(params.baseFileName);
  const fileName = base.endsWith('.pdf') ? base : `${base}.pdf`;

  const rect = captureElement.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));

  const pngDataUrl = await toPng(captureElement, {
    cacheBust: true,
    backgroundColor: getExportBackgroundColor(),
    fontEmbedCSS: '',
    imagePlaceholder: TRANSPARENT_PNG_DATA_URL,
    pixelRatio: Math.min(2, window.devicePixelRatio || 2),
    width,
    height,
    style: { width: `${width}px`, height: `${height}px` },
    filter: shouldIncludeNode,
  });

  const { width: imageWidth, height: imageHeight } = await getImageSize(pngDataUrl);
  const orientation = imageWidth >= imageHeight ? 'landscape' : 'portrait';

  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({
    orientation,
    unit: 'pt',
    format: 'a4',
    compress: true,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const [red, green, blue] = getExportPdfBackgroundRgb();
  pdf.setFillColor(red, green, blue);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  const margin = 24;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;
  const scale = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);

  const renderWidth = imageWidth * scale;
  const renderHeight = imageHeight * scale;
  const x = (pageWidth - renderWidth) / 2;
  const y = margin;

  pdf.addImage(pngDataUrl, 'PNG', x, y, renderWidth, renderHeight, undefined, 'FAST');
  pdf.save(fileName);
}

export type TabularExportData = {
  sheetName?: string;
  headers: string[];
  rows: Array<Array<string | number | null | undefined>>;
};

function toCsvValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  const stringValue = String(value);
  if (/[",\n\r]/.test(stringValue)) return `"${stringValue.replace(/"/g, '""')}"`;
  return stringValue;
}

export function exportTableAsCsv(params: {
  data: TabularExportData;
  baseFileName: string;
}): void {
  const base = sanitizeFileNamePart(params.baseFileName);
  const fileName = base.endsWith('.csv') ? base : `${base}.csv`;

  const lines: string[] = [];
  const title = params.data.sheetName?.trim();
  if (title) {
    const pad = Math.max(0, params.data.headers.length - 1);
    const titleRow = [title, ...Array.from({ length: pad }, () => '')];
    lines.push(titleRow.map(toCsvValue).join(','));
  }
  lines.push(params.data.headers.map(toCsvValue).join(','));
  for (const row of params.data.rows) {
    lines.push(row.map(toCsvValue).join(','));
  }
  const csv = `${lines.join('\n')}\n`;
  downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), fileName);
}

export async function exportTableAsXls(params: {
  data: TabularExportData;
  baseFileName: string;
}): Promise<void> {
  const base = sanitizeFileNamePart(params.baseFileName);
  const fileName = base.endsWith('.xlsx') ? base : `${base}.xlsx`;

  const title = params.data.sheetName?.trim();
  const headerRow = params.data.headers.map((header) => String(header));
  const bodyRows = params.data.rows.map((row) =>
    row.map((value) => (value === null || value === undefined ? '' : value)),
  );
  const titleRow = title
    ? [title, ...Array.from({ length: Math.max(0, headerRow.length - 1) }, () => '')]
    : null;
  const aoa: Array<Array<string | number>> = titleRow
    ? [titleRow, headerRow, ...bodyRows]
    : [headerRow, ...bodyRows];

  const XLSX = await import('xlsx');
  const worksheet = XLSX.utils.aoa_to_sheet(aoa);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, params.data.sheetName?.slice(0, 31) || 'Dados');
  XLSX.writeFile(workbook, fileName, { compression: true });
}
