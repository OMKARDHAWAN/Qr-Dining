const pptxgen = require('pptxgenjs');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'QR Dining Team';
pptx.company = 'QR Dining';
pptx.subject = 'QR Dining project presentation';
pptx.title = 'QR Dining — Smart Restaurant Experience';
pptx.lang = 'en-IN';
pptx.theme = {
  headFontFace: 'Aptos Display',
  bodyFontFace: 'Aptos',
  lang: 'en-IN'
};
pptx.defineLayout({ name: 'CUSTOM_WIDE', width: 13.333, height: 7.5 });
pptx.layout = 'CUSTOM_WIDE';

const C = {
  ink: '172033',
  slate: '536075',
  light: 'F7F8FC',
  white: 'FFFFFF',
  red: 'B41B00',
  coral: 'F26B4D',
  peach: 'FCE8E3',
  purple: '5E4DB2',
  lavender: 'EEEAFE',
  green: '1D8A5A',
  mint: 'E3F6EC',
  line: 'DEE3ED',
  amber: 'F2A93B',
};

function addBg(slide, color = C.light) {
  slide.background = { color };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 0.12, fill: { color: C.red }, line: { color: C.red } });
}

function addFooter(slide, page) {
  slide.addText('QR DINING  •  Smart restaurant experience', { x: 0.55, y: 7.12, w: 6, h: 0.18, fontFace: 'Aptos', fontSize: 7.5, color: '8490A4', margin: 0 });
  slide.addText(String(page).padStart(2, '0'), { x: 12.25, y: 7.08, w: 0.5, h: 0.2, fontFace: 'Aptos', fontSize: 8, bold: true, color: C.red, align: 'right', margin: 0 });
}

function title(slide, heading, subtitle, page) {
  addBg(slide);
  slide.addText(heading, { x: 0.58, y: 0.45, w: 8.8, h: 0.48, fontSize: 26, bold: true, color: C.ink, margin: 0, breakLine: false });
  if (subtitle) slide.addText(subtitle, { x: 0.6, y: 1.02, w: 10.8, h: 0.28, fontSize: 10.5, color: C.slate, margin: 0 });
  addFooter(slide, page);
}

function pill(slide, text, x, y, w, color, fill) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.35, rectRadius: 0.08, fill: { color: fill }, line: { color: fill } });
  slide.addText(text, { x: x + 0.08, y: y + 0.085, w: w - 0.16, h: 0.15, fontSize: 8.5, bold: true, align: 'center', color, margin: 0 });
}

function card(slide, x, y, w, h, heading, body, accent = C.red) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 0.8 }, shadow: { type: 'outer', color: 'A6B0C3', opacity: 0.13, blur: 1, angle: 45, distance: 1 } });
  slide.addShape(pptx.ShapeType.rect, { x, y, w: 0.08, h, fill: { color: accent }, line: { color: accent } });
  slide.addText(heading, { x: x + 0.25, y: y + 0.23, w: w - 0.45, h: 0.28, fontSize: 14, bold: true, color: C.ink, margin: 0 });
  slide.addText(body, { x: x + 0.25, y: y + 0.67, w: w - 0.45, h: h - 0.85, fontSize: 10.5, color: C.slate, breakLine: false, valign: 'top', margin: 0, fit: 'shrink' });
}

function iconCircle(slide, x, y, label, fill) {
  slide.addShape(pptx.ShapeType.ellipse, { x, y, w: 0.56, h: 0.56, fill: { color: fill }, line: { color: fill } });
  slide.addText(label, { x, y: y + 0.125, w: 0.56, h: 0.2, align: 'center', fontSize: 13, bold: true, color: C.white, margin: 0 });
}

// 1. Cover
{
  const s = pptx.addSlide();
  s.background = { color: C.ink };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 0.15, fill: { color: C.coral }, line: { color: C.coral } });
  s.addShape(pptx.ShapeType.arc, { x: 8.9, y: -1.15, w: 5.0, h: 5.0, adjustPoint: 0.25, line: { color: C.purple, transparency: 20, width: 2 }, rotate: 35 });
  s.addShape(pptx.ShapeType.arc, { x: 9.75, y: 3.55, w: 4.4, h: 4.4, adjustPoint: 0.25, line: { color: C.coral, transparency: 10, width: 2 }, rotate: 215 });
  pill(s, 'PROJECT PRESENTATION', 0.75, 1.18, 1.82, C.red, C.peach);
  s.addText('QR Dining', { x: 0.72, y: 1.8, w: 6.8, h: 0.88, fontSize: 42, bold: true, color: C.white, margin: 0 });
  s.addText('A smart, QR-first dining experience for customers, chefs, and restaurant administrators.', { x: 0.76, y: 2.88, w: 6.55, h: 0.75, fontSize: 18, color: 'DAE0EC', breakLine: false, margin: 0, valign: 'mid' });
  s.addShape(pptx.ShapeType.roundRect, { x: 0.75, y: 4.2, w: 5.85, h: 1.12, rectRadius: 0.08, fill: { color: '25314A' }, line: { color: '3A4761', width: 1 } });
  s.addText('Scan → Explore menu → Get recommendations → Order', { x: 1.02, y: 4.58, w: 5.32, h: 0.26, align: 'center', fontSize: 15, bold: true, color: C.white, margin: 0 });
  s.addText('React + Vite  •  ASP.NET Core  •  SQL Server', { x: 0.76, y: 6.7, w: 6.8, h: 0.25, fontSize: 10.5, color: 'AEB9CD', margin: 0 });
}

// 2. Problem and solution
{
  const s = pptx.addSlide(); title(s, 'The opportunity', 'Restaurants need a quicker, more engaging, and easier-to-manage digital dining flow.', 2);
  card(s, 0.72, 1.65, 3.86, 3.95, 'Today’s friction', '• Printed menus go out of date\n• Staff spend time answering repeat questions\n• Orders and offers are harder to surface\n• Limited visibility into customer preferences', C.red);
  card(s, 4.75, 1.65, 3.86, 3.95, 'QR Dining solution', '• A table-first QR entry point\n• Mobile-friendly menu discovery\n• Cart and intelligent dish suggestions\n• Dedicated chef and admin workspaces', C.purple);
  card(s, 8.78, 1.65, 3.86, 3.95, 'Business impact', '• Faster table turnaround\n• Consistent digital menu experience\n• Better offer visibility\n• Foundation for personalized dining', C.green);
  s.addText('One platform connects the guest experience with restaurant operations.', { x: 1.45, y: 6.08, w: 10.4, h: 0.34, align: 'center', fontSize: 16, bold: true, color: C.ink, margin: 0 });
}

// 3. User journey
{
  const s = pptx.addSlide(); title(s, 'Customer journey', 'The experience starts at the table and continues on a personal, mobile-first menu.', 3);
  const steps = [
    ['1', 'Scan QR', 'Guest opens the table landing page.'],
    ['2', 'Browse', 'Discover offers, categories, dishes, and specials.'],
    ['3', 'Choose', 'Add items to a persistent cart with quantity controls.'],
    ['4', 'Assist', 'Use the AI assistant for dish ideas and recommendations.'],
    ['5', 'Order-ready', 'The final cart is ready for the restaurant workflow.'],
  ];
  steps.forEach((step, i) => {
    const x = 0.56 + i * 2.52;
    if (i < steps.length - 1) s.addShape(pptx.ShapeType.line, { x: x + 1.55, y: 3.15, w: 1.08, h: 0, line: { color: C.line, width: 2, beginArrowType: 'none', endArrowType: 'triangle' } });
    s.addShape(pptx.ShapeType.roundRect, { x, y: 2.05, w: 1.92, h: 2.42, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 0.8 } });
    iconCircle(s, x + 0.68, 2.34, step[0], i === 0 ? C.red : (i === 3 ? C.purple : C.green));
    s.addText(step[1], { x: x + 0.13, y: 3.1, w: 1.66, h: 0.24, align: 'center', fontSize: 12.5, bold: true, color: C.ink, margin: 0 });
    s.addText(step[2], { x: x + 0.16, y: 3.52, w: 1.6, h: 0.62, align: 'center', fontSize: 8.7, color: C.slate, margin: 0, fit: 'shrink' });
  });
  s.addShape(pptx.ShapeType.roundRect, { x: 1.42, y: 5.35, w: 10.5, h: 0.65, rectRadius: 0.08, fill: { color: C.peach }, line: { color: C.peach } });
  s.addText('Designed for a restaurant guest: fast, visual, touch-friendly, and tailored to the current table.', { x: 1.7, y: 5.55, w: 9.95, h: 0.2, align: 'center', fontSize: 12, bold: true, color: C.red, margin: 0 });
}

// 4. Personas
{
  const s = pptx.addSlide(); title(s, 'Three experiences, one platform', 'QR Dining serves every part of the restaurant operation through role-specific routes and screens.', 4);
  const personas = [
    { x: 0.8, icon: 'G', name: 'Guest / Customer', color: C.red, fill: C.peach, route: '/user', items: 'Menu discovery\nOffers and specials\nCart and AI assistant' },
    { x: 4.75, icon: 'C', name: 'Chef', color: C.purple, fill: C.lavender, route: '/chef', items: 'Dashboard overview\nOrders and menu\nInventory, offers, staff' },
    { x: 8.7, icon: 'A', name: 'Administrator', color: C.green, fill: C.mint, route: '/admin', items: 'Admin dashboard\nSecure staff access\nRestaurant operations' },
  ];
  personas.forEach(p => {
    s.addShape(pptx.ShapeType.roundRect, { x: p.x, y: 1.7, w: 3.28, h: 4.23, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.line, width: 0.9 } });
    s.addShape(pptx.ShapeType.roundRect, { x: p.x, y: 1.7, w: 3.28, h: 1.2, rectRadius: 0.1, fill: { color: p.fill }, line: { color: p.fill } });
    iconCircle(s, p.x + 0.36, 2.02, p.icon, p.color);
    s.addText(p.name, { x: p.x + 1.1, y: 2.13, w: 1.85, h: 0.27, fontSize: 14, bold: true, color: C.ink, margin: 0, fit: 'shrink' });
    pill(s, p.route, p.x + 0.35, 3.25, 1.05, p.color, p.fill);
    s.addText(p.items, { x: p.x + 0.35, y: 3.9, w: 2.55, h: 1.25, fontSize: 12, color: C.slate, breakLine: false, margin: 0, fit: 'shrink' });
  });
}

// 5. Customer app
{
  const s = pptx.addSlide(); title(s, 'Customer experience', 'A polished, menu-first interface optimized for discovery and conversion.', 5);
  const features = [
    ['Featured offers', 'Carousel-style promotional cards keep active offers visible.', C.coral],
    ['Category browsing', 'Quick filters make large menus easy to explore.', C.red],
    ['Interactive cart', 'Adjust quantities, see totals, and review selections.', C.purple],
    ['AI assistant', 'Guided dish suggestions improve menu confidence.', C.green],
  ];
  features.forEach((f, i) => {
    const x = i % 2 === 0 ? 0.78 : 6.82;
    const y = i < 2 ? 1.63 : 3.82;
    iconCircle(s, x, y + 0.18, String(i + 1), f[2]);
    card(s, x + 0.75, y, 5.0, 1.58, f[0], f[1], f[2]);
  });
  s.addShape(pptx.ShapeType.roundRect, { x: 9.45, y: 1.55, w: 2.45, h: 4.5, rectRadius: 0.18, fill: { color: C.ink }, line: { color: C.ink } });
  s.addShape(pptx.ShapeType.roundRect, { x: 9.65, y: 1.92, w: 2.05, h: 3.76, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.white } });
  s.addShape(pptx.ShapeType.roundRect, { x: 10.23, y: 2.1, w: 0.9, h: 0.11, rectRadius: 0.04, fill: { color: C.ink }, line: { color: C.ink } });
  s.addText('CulinaryAI', { x: 9.95, y: 2.55, w: 1.43, h: 0.25, fontSize: 12, bold: true, color: C.ink, align: 'center', margin: 0 });
  s.addShape(pptx.ShapeType.roundRect, { x: 9.84, y: 3.02, w: 1.68, h: 0.72, rectRadius: 0.06, fill: { color: C.peach }, line: { color: C.peach } });
  s.addText('Today’s offer', { x: 10.02, y: 3.26, w: 1.3, h: 0.15, fontSize: 8.5, bold: true, color: C.red, align: 'center', margin: 0 });
  s.addShape(pptx.ShapeType.roundRect, { x: 9.84, y: 4.02, w: 1.68, h: 0.36, rectRadius: 0.06, fill: { color: C.lavender }, line: { color: C.lavender } });
  s.addText('Explore menu', { x: 9.98, y: 4.135, w: 1.38, h: 0.1, fontSize: 7.5, bold: true, color: C.purple, align: 'center', margin: 0 });
  s.addShape(pptx.ShapeType.ellipse, { x: 11.17, y: 4.86, w: 0.32, h: 0.32, fill: { color: C.red }, line: { color: C.red } });
  s.addText('AI', { x: 11.17, y: 4.95, w: 0.32, h: 0.08, fontSize: 5.5, bold: true, color: C.white, align: 'center', margin: 0 });
}

// 6. Operations
{
  const s = pptx.addSlide(); title(s, 'Restaurant operations', 'Separate dashboards make day-to-day work visible and manageable for the team.', 6);
  card(s, 0.7, 1.65, 3.75, 3.95, 'Chef workspace', '• Dashboard and order view\n• Menu and inventory controls\n• Offers, staff, and profile pages\n• Supports daily kitchen decisions', C.purple);
  card(s, 4.79, 1.65, 3.75, 3.95, 'Admin workspace', '• Central administrator route\n• Staff authentication via JWT\n• Foundation for permissions and account management\n• Secure entry point for restaurant control', C.green);
  card(s, 8.88, 1.65, 3.75, 3.95, 'API-backed modules', '• Inventory management\n• Offer management\n• Recommendation endpoints\n• User interactions captured for personalization', C.red);
  s.addText('Operational features share one backend and one database, reducing duplication across roles.', { x: 1.28, y: 6.08, w: 10.8, h: 0.3, align: 'center', fontSize: 14.5, bold: true, color: C.ink, margin: 0 });
}

// 7. Architecture
{
  const s = pptx.addSlide(); title(s, 'System architecture', 'A React single-page application communicates with an ASP.NET Core API and SQL Server database.', 7);
  const boxes = [
    { x: 0.75, y: 2.05, w: 3.18, h: 2.85, label: 'Frontend', sub: 'React + Vite\nReact Router\nTailwind CSS\nCustomer, chef & admin routes', c: C.red, f: C.peach },
    { x: 5.08, y: 2.05, w: 3.18, h: 2.85, label: 'Backend API', sub: 'ASP.NET Core\nControllers + services\nJWT authentication\nCORS-enabled endpoints', c: C.purple, f: C.lavender },
    { x: 9.4, y: 2.05, w: 3.18, h: 2.85, label: 'Data layer', sub: 'EF Core\nSQL Server / LocalDB\nMigrations\nUsers, inventory, offers & interactions', c: C.green, f: C.mint },
  ];
  boxes.forEach((b, i) => {
    s.addShape(pptx.ShapeType.roundRect, { x: b.x, y: b.y, w: b.w, h: b.h, rectRadius: 0.08, fill: { color: b.f }, line: { color: b.c, width: 1.2 } });
    s.addText(b.label, { x: b.x + 0.25, y: b.y + 0.36, w: b.w - 0.5, h: 0.3, fontSize: 17, bold: true, color: C.ink, align: 'center', margin: 0 });
    s.addText(b.sub, { x: b.x + 0.3, y: b.y + 1.05, w: b.w - 0.6, h: 1.35, fontSize: 12.2, color: C.slate, align: 'center', breakLine: false, margin: 0, fit: 'shrink' });
    if (i < boxes.length - 1) s.addShape(pptx.ShapeType.line, { x: b.x + b.w + 0.15, y: 3.45, w: 0.82, h: 0, line: { color: C.slate, width: 2, beginArrowType: 'none', endArrowType: 'triangle' } });
  });
  s.addShape(pptx.ShapeType.roundRect, { x: 2.15, y: 5.55, w: 9.02, h: 0.6, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.line, width: 0.8 } });
  s.addText('HTTP/JSON requests  •  Protected admin actions use Bearer tokens  •  EF Core migrations evolve the schema', { x: 2.35, y: 5.75, w: 8.62, h: 0.16, align: 'center', fontSize: 10.5, bold: true, color: C.slate, margin: 0 });
}

// 8. Security and data
{
  const s = pptx.addSlide(); title(s, 'Authentication and data foundation', 'The merged project adds a role-aware user model and JWT-protected staff workflow.', 8);
  const security = [
    ['Staff login', 'Admin and chef credentials authenticate through /api/auth/staff-login.'],
    ['JWT tokens', 'Authenticated sessions receive signed Bearer tokens for protected endpoints.'],
    ['Role model', 'Users are categorized as Admin, Chef, or User for future route and action control.'],
    ['EF migration', 'AddUserAuthentication creates the user table and seeds initial staff accounts.'],
  ];
  security.forEach((sct, i) => {
    const x = i % 2 === 0 ? 0.72 : 6.88;
    const y = i < 2 ? 1.62 : 3.72;
    const color = [C.red, C.purple, C.green, C.amber][i];
    iconCircle(s, x, y + 0.22, '✓', color);
    card(s, x + 0.75, y, 5.1, 1.62, sct[0], sct[1], color);
  });
  s.addText('Current seed credentials are intended for local development only; replace the JWT secret and seed accounts before production.', { x: 1.1, y: 6.1, w: 11.05, h: 0.25, align: 'center', fontSize: 10.5, italic: true, color: C.slate, margin: 0 });
}

// 9. Technology stack
{
  const s = pptx.addSlide(); title(s, 'Technology stack', 'A practical full-stack foundation for a restaurant web application.', 9);
  const stacks = [
    ['Client', 'React 19\nVite\nReact Router\nTailwind CSS\nLucide icons + Swiper', C.red, C.peach],
    ['Server', 'ASP.NET Core 8\nREST controllers\nSwagger\nJWT Bearer authentication\nCORS', C.purple, C.lavender],
    ['Data & AI', 'Entity Framework Core\nSQL Server / LocalDB\nMigrations\nInventory, offers & recommendations', C.green, C.mint],
  ];
  stacks.forEach((st, i) => {
    const x = 0.85 + i * 4.15;
    s.addShape(pptx.ShapeType.roundRect, { x, y: 1.75, w: 3.65, h: 3.9, rectRadius: 0.12, fill: { color: st[3] }, line: { color: st[2], width: 1.1 } });
    s.addShape(pptx.ShapeType.ellipse, { x: x + 1.35, y: 2.12, w: 0.95, h: 0.95, fill: { color: st[2] }, line: { color: st[2] } });
    s.addText(String(i + 1), { x: x + 1.35, y: 2.38, w: 0.95, h: 0.2, align: 'center', fontSize: 15, bold: true, color: C.white, margin: 0 });
    s.addText(st[0], { x: x + 0.25, y: 3.38, w: 3.15, h: 0.28, fontSize: 18, bold: true, color: C.ink, align: 'center', margin: 0 });
    s.addText(st[1], { x: x + 0.36, y: 4.02, w: 2.93, h: 1.18, fontSize: 11.5, color: C.slate, align: 'center', breakLine: false, margin: 0, fit: 'shrink' });
  });
}

// 10. Run and demonstrate
{
  const s = pptx.addSlide(); title(s, 'Demo flow and next steps', 'The consolidated project is now organized as one frontend and one backend.', 10);
  card(s, 0.72, 1.62, 5.85, 4.25, 'Run the project', '1. Start the backend from /backend\n   dotnet ef database update\n   dotnet run\n\n2. Start the frontend from /my-app\n   npm install\n   npm run dev\n\n3. Open the displayed local Vite URL.', C.red);
  card(s, 6.78, 1.62, 5.85, 4.25, 'Demonstrate in this order', '• Scan / landing page → View menu\n• Browse offers, categories, cart, and AI assistant\n• Show chef dashboard and operations pages\n• Sign in at /login as a staff user\n• Open Swagger to inspect API endpoints', C.purple);
  s.addShape(pptx.ShapeType.roundRect, { x: 2.1, y: 6.2, w: 9.15, h: 0.45, rectRadius: 0.08, fill: { color: C.ink }, line: { color: C.ink } });
  s.addText('QR Dining turns a static menu into a connected digital restaurant experience.', { x: 2.35, y: 6.34, w: 8.65, h: 0.14, align: 'center', fontSize: 11.8, bold: true, color: C.white, margin: 0 });
}

pptx.writeFile({ fileName: 'C:/Users/Manvendra Kushwaha/Qr-Dining/QR-Dining-Project-Presentation.pptx' });
