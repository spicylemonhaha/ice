import { matchRoutes } from 'react-router-dom';
import { formatNestedRouteManifest, generateRouteManifest } from '@ice/route-manifest';

export function setupRenderServer(options) {
  const { rootDir, entry } = options;

  // TODO: get route manifest from context
  const routeManifests = generateRouteManifest(rootDir);
  const routes = formatNestedRouteManifest(routeManifests);

  return async (req, res) => {
    console.log('----------------------------------------------------------------');
    console.log(req.path);

    // If not match pages routes, hand over to webpack dev server for processing
    let matches = matchRoutes(routes, req.path);
    if (!matches) return;

    console.log(entry);
    const serverEntry = await import(entry);

    console.log(serverEntry);
    // TODO: disable cache
    const html = renderDocument(path.join(outDir, 'document.js'));

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}