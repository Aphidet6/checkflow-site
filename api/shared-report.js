import { list, put } from '@vercel/blob';

const REPORT_PREFIX = 'checkflow/shared-report';
const MAX_REPORT_BYTES = 1024 * 1024;

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: REPORT_PREFIX,
      limit: 100,
    });
    const latest = blobs
      .filter(blob => blob.pathname.endsWith('.md'))
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];

    if (!latest) {
      return json({ available: false });
    }

    const response = await fetch(latest.url, { cache: 'no-store' });
    if (!response.ok) {
      return json({ error: 'Could not read the shared report.' }, 502);
    }

    return json({
      available: true,
      report: await response.text(),
      updatedAt: latest.uploadedAt,
      size: latest.size,
    });
  } catch (error) {
    return json({
      error: 'Shared storage is not ready.',
      detail: error instanceof Error ? error.message : String(error),
    }, 503);
  }
}

export async function POST(request) {
  const updateKey = process.env.REPORT_UPDATE_KEY;
  const suppliedKey = request.headers.get('x-update-key');

  if (!updateKey) {
    return json({ error: 'REPORT_UPDATE_KEY is not configured.' }, 503);
  }
  if (!suppliedKey || suppliedKey !== updateKey) {
    return json({ error: 'Wrong update password.' }, 401);
  }

  const report = await request.text();
  const size = new TextEncoder().encode(report).byteLength;

  if (!report.startsWith('# Roblox Flow Test Report')) {
    return json({ error: 'This is not a Roblox Flow Test Report file.' }, 400);
  }
  const systemCount = (report.match(/^### \d+\. .+$/gm) || []).length;
  if (systemCount < 32) {
    return json({ error: 'Publish the complete report with all 32 systems.' }, 400);
  }
  if (size > MAX_REPORT_BYTES) {
    return json({ error: 'Report is too large. Maximum size is 1 MB.' }, 413);
  }

  try {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const blob = await put(`${REPORT_PREFIX}-${stamp}.md`, report, {
      access: 'public',
      addRandomSuffix: true,
      contentType: 'text/markdown; charset=utf-8',
      cacheControlMaxAge: 60,
    });

    return json({
      ok: true,
      updatedAt: blob.uploadedAt || new Date().toISOString(),
      size,
    });
  } catch (error) {
    return json({
      error: 'Could not save the shared report.',
      detail: error instanceof Error ? error.message : String(error),
    }, 500);
  }
}
