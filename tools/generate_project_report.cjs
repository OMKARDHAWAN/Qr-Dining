const fs = require('fs');
const {
  AlignmentType, BorderStyle, Document, Footer, Header, HeadingLevel, PageBreak,
  PageNumber, Packer, Paragraph, ShadingType, Table, TableCell, TableRow,
  TextRun, WidthType
} = require('docx');

const OUT = 'C:/Users/Manvendra Kushwaha/Qr-Dining/QR-Dining-Project-Report.docx';
const C = { ink: '172033', slate: '536075', red: 'B41B00', coral: 'F26B4D', light: 'F7F8FC', line: 'DDE3ED', white: 'FFFFFF', purple: '5E4DB2', green: '1D8A5A' };

function run(text, options = {}) { return new TextRun({ text, font: 'Aptos', size: 21, color: C.ink, ...options }); }
function para(text, options = {}) {
  return new Paragraph({ children: [run(text, { size: 21, color: C.slate, ...options.run })], spacing: { after: 130, line: 295 }, ...options });
}
function bullet(text) {
  return new Paragraph({ children: [run(text, { size: 20, color: C.slate })], bullet: { level: 0 }, spacing: { after: 65, line: 275 } });
}
function heading(text, level = HeadingLevel.HEADING_1) {
  const size = level === HeadingLevel.HEADING_1 ? 32 : 25;
  return new Paragraph({ text, heading: level, spacing: { before: level === HeadingLevel.HEADING_1 ? 260 : 180, after: 120 }, run: { font: 'Aptos Display', size, bold: true, color: C.ink } });
}
function pageBreak() { return new Paragraph({ children: [new PageBreak()] }); }
function cell(text, width, fill = C.white, bold = false) {
  return new TableCell({ shading: { fill, type: ShadingType.CLEAR }, margins: { top: 110, bottom: 110, left: 130, right: 130 }, children: [new Paragraph({ children: [run(text, { size: 18, bold, color: bold ? C.ink : C.slate })], spacing: { after: 0 } })] });
}
function table(headers, rows, widths) {
  return new Table({ borders: {
    top: { style: BorderStyle.SINGLE, size: 5, color: C.line }, bottom: { style: BorderStyle.SINGLE, size: 5, color: C.line }, left: { style: BorderStyle.SINGLE, size: 5, color: C.line }, right: { style: BorderStyle.SINGLE, size: 5, color: C.line }, insideHorizontal: { style: BorderStyle.SINGLE, size: 5, color: C.line }, insideVertical: { style: BorderStyle.SINGLE, size: 5, color: C.line },
  }, rows: [
    new TableRow({ children: headers.map((h, i) => cell(h, widths[i], 'FCE8E3', true)) }),
    ...rows.map((r, ri) => new TableRow({ children: r.map((v, i) => cell(v, widths[i], ri % 2 ? 'FBFCFE' : C.white)) })),
  ] });
}

const header = new Header({ children: [new Paragraph({ children: [run('QR DINING', { size: 18, bold: true, color: C.red }), run('   |   Project Report', { size: 18, color: C.slate })], border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.line, space: 5 } }, spacing: { after: 90 } })] });
const footer = new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [run('QR Dining  •  Smart Restaurant Experience  •  ', { size: 16, color: '8490A4' }), new TextRun({ children: [PageNumber.CURRENT], font: 'Aptos', size: 16, color: '8490A4' })] })] });

const children = [];

// Cover page
children.push(new Paragraph({ spacing: { before: 1680, after: 120 }, alignment: AlignmentType.CENTER, children: [run('PROJECT REPORT', { size: 20, bold: true, color: C.red, characterSpacing: 40 })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 180 }, children: [run('QR Dining', { size: 56, bold: true, color: C.ink, font: 'Aptos Display' })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 450 }, children: [run('A QR-first smart restaurant platform for customers, chefs, and administrators', { size: 25, color: C.slate })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [run('Technology: React + Vite  •  ASP.NET Core  •  Entity Framework Core  •  SQL Server', { size: 20, color: C.purple, bold: true })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1300 }, children: [run('Prepared for project documentation and demonstration', { size: 19, color: '8490A4' })] }));
children.push(pageBreak());

// Executive summary
children.push(heading('Executive Summary'));
children.push(para('QR Dining is a full-stack restaurant management and customer dining application. It replaces a static table menu with a QR-led digital experience in which guests can explore dishes, view offers, manage a cart, and receive AI-assisted suggestions. The same platform includes chef and administrator workspaces for operational tasks.'));
children.push(para('The consolidated project contains a React/Vite frontend and an ASP.NET Core backend connected through REST APIs. The backend uses Entity Framework Core with SQL Server/LocalDB and now includes JWT-based staff authentication, user roles, and database migrations for the authentication model.'));
children.push(heading('Project Objectives', HeadingLevel.HEADING_2));
children.push(bullet('Provide a fast, mobile-friendly QR entry point for restaurant guests.'));
children.push(bullet('Make menus, special offers, cart actions, and dish discovery easier to use at the table.'));
children.push(bullet('Give chefs and administrators dedicated dashboards for restaurant operations.'));
children.push(bullet('Establish a secure backend foundation for staff login, roles, and future protected actions.'));
children.push(bullet('Capture interactions and support recommendation-driven dining experiences.'));
children.push(pageBreak());

// Contents
children.push(heading('Table of Contents'));
['1. Introduction', '2. Problem Statement and Proposed Solution', '3. Functional Modules', '4. System Architecture', '5. Frontend Design and User Flow', '6. Backend Design and Data Model', '7. Authentication and Security', '8. Technology Stack', '9. Build, Testing, and Deployment', '10. Future Scope', 'Appendix A. Routes and API Areas'].forEach((item) => children.push(para(item, { spacing: { after: 75 }, run: { size: 21, color: C.slate } })));
children.push(pageBreak());

// Introduction
children.push(heading('1. Introduction'));
children.push(para('Restaurants often rely on printed menus and manual communication to guide diners through a meal. This can slow ordering, reduce visibility of time-sensitive offers, and make it difficult to learn from guest preferences. QR Dining addresses these concerns through a browser-based platform that begins with a QR code at the table.'));
children.push(para('The application is designed as a single project with two principal applications: a frontend in the my-app folder and a backend in the backend folder. The frontend gives each user type a focused interface, while the backend exposes REST endpoints for inventory, offers, recommendations, authentication, and supporting data.'));
children.push(heading('2. Problem Statement and Proposed Solution'));
children.push(table(['Problem', 'QR Dining response'], [
  ['Printed menus are difficult to update quickly.', 'A digital menu can surface current categories, items, and offers.'],
  ['Guests need simple ordering guidance at the table.', 'QR landing page, menu discovery, cart controls, and AI assistant support.'],
  ['Kitchen and admin tasks are spread across manual processes.', 'Dedicated chef and admin routes organize operational pages.'],
  ['Restaurant systems lack a secure user foundation.', 'JWT login, roles, user records, and EF Core migration support.'],
], [4600, 4600]));
children.push(pageBreak());

// Modules
children.push(heading('3. Functional Modules'));
children.push(heading('3.1 Customer Module', HeadingLevel.HEADING_2));
children.push(para('The customer experience is entered from the QR landing screen. The guest then moves to the /user route, where the application presents the menu, featured promotions, categories, product cards, today’s specials, a shopping cart, and an AI assistant modal.'));
children.push(table(['Feature', 'Purpose'], [
  ['QR landing page', 'Represents a table-level entry point and directs the guest to the digital menu.'],
  ['Featured offers', 'Highlights restaurant promotions through visual menu content.'],
  ['Category and product browsing', 'Makes dishes easier to discover and filter.'],
  ['Cart drawer', 'Lets guests add products, change quantities, and review totals.'],
  ['AI assistant and recommendations', 'Provides a foundation for personalized dish discovery.'],
], [3500, 5700]));
children.push(heading('3.2 Chef Module', HeadingLevel.HEADING_2));
children.push(para('The chef workspace is available under /chef. It includes dashboard, orders, menu, inventory, offers, staff, and profile pages. These pages support the daily workflow of managing food availability and restaurant operations.'));
children.push(heading('3.3 Administrator Module', HeadingLevel.HEADING_2));
children.push(para('The administrator workspace is available under /admin. It provides the main admin dashboard and is paired with the staff authentication foundation so that administrative actions can be protected as the system evolves.'));
children.push(pageBreak());

// Architecture
children.push(heading('4. System Architecture'));
children.push(para('QR Dining follows a three-layer web architecture. The React frontend communicates with an ASP.NET Core backend over HTTP/JSON. The backend uses service and repository patterns to access data through Entity Framework Core, which persists to SQL Server or LocalDB.'));
children.push(table(['Layer', 'Main responsibilities', 'Implemented technologies'], [
  ['Presentation layer', 'QR landing page, customer menu, cart, AI interface, chef pages, admin pages, routing.', 'React 19, Vite, React Router, Tailwind CSS, Lucide React, Swiper'],
  ['Application layer', 'REST endpoints, business services, CORS, Swagger, authentication and authorization.', 'ASP.NET Core 8, Controllers, Services, JWT Bearer'],
  ['Data layer', 'Database context, migrations, inventory, offers, interactions, users and credentials.', 'Entity Framework Core, SQL Server / LocalDB'],
], [1800, 4400, 3000]));
children.push(heading('Request Flow', HeadingLevel.HEADING_2));
children.push(bullet('A guest opens the QR landing page and selects View menu.'));
children.push(bullet('React Router renders the appropriate customer, chef, or admin route.'));
children.push(bullet('Frontend services call /api endpoints, using the Vite development proxy or VITE_API_BASE_URL.'));
children.push(bullet('ASP.NET Core controllers delegate to services and repositories.'));
children.push(bullet('Entity Framework Core reads and writes SQL Server data through ApplicationDbContext.'));
children.push(pageBreak());

// Frontend
children.push(heading('5. Frontend Design and User Flow'));
children.push(para('The frontend is organized around feature folders, layouts, dashboards, reusable components, services, and app-level providers. The main application wraps the UI with BrowserRouter, AuthProvider, and CartProvider. This allows routes to share navigation state, authentication state, and cart state without prop drilling across unrelated areas.'));
children.push(table(['Route', 'Screen / purpose'], [
  ['/', 'QR table landing page; directs guests to the menu.'],
  ['/user', 'Customer menu, offers, categories, cart, and AI assistant.'],
  ['/login', 'Staff login screen using the authentication provider.'],
  ['/chef/*', 'Chef dashboard, orders, menu, inventory, offers, staff, and profile pages.'],
  ['/admin/*', 'Administrator dashboard area.'],
], [2200, 7000]));
children.push(heading('State Management', HeadingLevel.HEADING_2));
children.push(bullet('CartProvider stores selected dishes, quantities, subtotal, tax, delivery fee, and total price.'));
children.push(bullet('AuthProvider restores user and token data from local storage and exposes login/logout actions.'));
children.push(bullet('Customer components manage search, category, active section, cart drawer, and AI modal state.'));
children.push(pageBreak());

// Backend
children.push(heading('6. Backend Design and Data Model'));
children.push(para('The backend is an ASP.NET Core Web API and MVC project. Program.cs configures controllers, Swagger, CORS, Entity Framework Core, recommendation services, inventory services, offer services, repositories, and JWT authentication.'));
children.push(heading('Key Backend Areas', HeadingLevel.HEADING_2));
children.push(table(['Area', 'Description'], [
  ['Controllers', 'InventoryController, OfferController, RecommendationController, and AuthController expose API endpoints.'],
  ['Services', 'Business logic for inventory, offers, AI recommendations, and authentication.'],
  ['Repositories', 'UserRepository isolates user database access behind IUserRepository.'],
  ['DTOs', 'Request and response types keep API contracts separate from database entities.'],
  ['Migrations', 'EF Core migration history creates and evolves the relational schema.'],
], [3000, 6200]));
children.push(heading('Primary Data Entities', HeadingLevel.HEADING_2));
children.push(bullet('User: username, email, mobile number, password hash, role, and account creation date.'));
children.push(bullet('Inventory: restaurant dishes/items used for menu and availability features.'));
children.push(bullet('Offer: discount and promotional information.'));
children.push(bullet('UserInteraction: captures user/item actions for recommendation logic.'));
children.push(bullet('Admin: existing administrative model maintained by the project.'));
children.push(pageBreak());

// Security
children.push(heading('7. Authentication and Security'));
children.push(para('The merged application includes a dedicated authentication flow for staff users. The AuthController defines endpoints for customer login/registration, staff login, chef account creation, profile lookup, and logout guidance. Staff login validates credentials through AuthService and UserRepository, then produces a signed JWT.'));
children.push(table(['Security measure', 'Implementation'], [
  ['Credential handling', 'Passwords are stored as SHA-256 hashes via PasswordHelper in the current project implementation.'],
  ['Authentication', 'ASP.NET Core JwtBearer validates issuer, audience, token lifetime, and signing key.'],
  ['Authorization', 'The create-chef endpoint is marked for the Admin role; profile and logout require authentication.'],
  ['Client persistence', 'The frontend stores the token and user profile in local storage for session restoration.'],
  ['Configuration', 'JWT values are configured under the Jwt section of appsettings.json.'],
], [3300, 5900]));
children.push(para('Production note: before deployment, the JWT secret, local development seed accounts, database connection string, CORS origins, and password hashing strategy should be replaced with production-grade values and secrets management.', { run: { italic: true, color: C.red } }));
children.push(pageBreak());

// Stack and testing
children.push(heading('8. Technology Stack'));
children.push(table(['Category', 'Technologies'], [
  ['Frontend', 'React 19, Vite, React Router, Tailwind CSS, Lucide React, Swiper'],
  ['Backend', 'ASP.NET Core 8, C#, Swagger / OpenAPI, JWT Bearer authentication'],
  ['Persistence', 'Entity Framework Core, Microsoft SQL Server / LocalDB'],
  ['Development tools', 'npm, dotnet CLI, EF Core migrations, Visual Studio / VS Code compatible structure'],
], [2800, 6400]));
children.push(heading('9. Build, Testing, and Deployment', HeadingLevel.HEADING_1));
children.push(para('The consolidated frontend and backend were validated after the merge. The frontend production bundle completed successfully and the .NET backend compiled with zero errors. The database migration AddUserAuthentication was generated for the combined authentication and data model.'));
children.push(table(['Validation activity', 'Command / result'], [
  ['Frontend build', 'npm.cmd run build — successful Vite production build.'],
  ['Backend build', 'dotnet build backend.csproj --no-restore — successful, zero errors.'],
  ['Migration generation', 'dotnet ef migrations add AddUserAuthentication — completed successfully.'],
], [3100, 6100]));
children.push(pageBreak());

// Running & future
children.push(heading('10. Run Instructions and Future Scope'));
children.push(heading('Local Setup', HeadingLevel.HEADING_2));
children.push(bullet('Backend: open the backend folder, run dotnet ef database update, then run dotnet run.'));
children.push(bullet('Frontend: open the my-app folder, run npm install, then run npm run dev.'));
children.push(bullet('Use the Vite URL shown in the terminal. During local development, the Vite proxy forwards /api requests to the backend target configured in vite.config.js.'));
children.push(heading('Recommended Future Enhancements', HeadingLevel.HEADING_2));
children.push(bullet('Connect the cart to a complete order and payment workflow.'));
children.push(bullet('Apply protected-route guards and direct users to role-appropriate dashboards after login.'));
children.push(bullet('Add real-time order status updates between the kitchen and guest interface.'));
children.push(bullet('Replace local development credentials and SHA-256 hashing with a production identity provider or a modern password-hashing algorithm.'));
children.push(bullet('Expand recommendation data with orders, dietary preferences, feedback, and availability signals.'));
children.push(heading('Conclusion', HeadingLevel.HEADING_2));
children.push(para('QR Dining provides a coherent foundation for a modern restaurant platform. It combines an engaging customer-facing QR menu with operational dashboards and a full-stack backend. The merged project is now organized as one application with a clear path for more advanced ordering, personalization, and restaurant management features.'));
children.push(pageBreak());

// Appendix
children.push(heading('Appendix A. Routes and API Areas'));
children.push(table(['Area', 'Current route or endpoint group', 'Use'], [
  ['Customer frontend', '/', '/user', 'QR table entry and customer menu experience.'],
  ['Staff frontend', '/login', '/chef/*', '/admin/*', 'Staff sign-in and operational workspaces.'],
  ['Authentication API', '/api/auth/*', 'Customer/staff login, chef creation, profile, logout.'],
  ['Inventory API', 'InventoryController endpoint group', 'Inventory management.'],
  ['Offer API', 'OfferController endpoint group', 'Offer management.'],
  ['Recommendation API', 'RecommendationController endpoint group', 'Recommendations and interaction handling.'],
  ['API exploration', '/swagger', 'Interactive backend endpoint documentation.'],
], [2100, 3000, 4100]));
children.push(heading('Appendix B. Folder Structure', HeadingLevel.HEADING_2));
children.push(table(['Folder', 'Contents'], [
  ['my-app/', 'React/Vite frontend, routes, layouts, dashboard components, providers, services.'],
  ['backend/', 'ASP.NET Core project, controllers, services, repositories, models, DTOs, migrations.'],
  ['backend/Migrations/', 'Entity Framework Core schema history including AddUserAuthentication.'],
  ['tools/', 'Presentation and report generation scripts.'],
], [2400, 6800]));

const doc = new Document({
  creator: 'QR Dining Team',
  title: 'QR Dining Project Report',
  description: 'Technical and functional report for QR Dining',
  styles: {
    default: { document: { run: { font: 'Aptos', size: 21, color: C.slate } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', run: { font: 'Aptos Display', size: 32, bold: true, color: C.ink }, paragraph: { spacing: { before: 260, after: 120 } } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', run: { font: 'Aptos Display', size: 25, bold: true, color: C.ink }, paragraph: { spacing: { before: 180, after: 110 } } },
    ]
  },
  sections: [{ properties: { page: { margin: { top: 850, right: 850, bottom: 780, left: 850 } } }, headers: { default: header }, footers: { default: footer }, children }]
});

Packer.toBuffer(doc).then(buffer => fs.writeFileSync(OUT, buffer));
