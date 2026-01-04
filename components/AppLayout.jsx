import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};
// 4. On click, prevent default and update history
    // const handleClick = (e) => {
    //     e.preventDefault();  // Don't do full page reload
    //     window.history.pushState({}, '', targetPath);  // Update URL
    //     // Notify React Router that URL changed
    // };
    
    // return (
    //     <a href={fullURL} onClick={handleClick}>
    //         {children}
    //     </a>
    // );

// Simplified matching logic

// function Routes({ children }) {
//     // 1. Get current path from BrowserRouter
//     const currentPath = window.location.pathname;  // "/profile"
    
//     // 2. Your route configuration
//     const routeConfig = [
//         {
//             path: "/",
//             element: <AppLayout />,
//             children: [
//                 { index: true, element: <Body /> },      // matches "/"
//                 { path: "profile", element: <Profile /> } // matches "/profile"
//             ]
//         }
//     ];
    
//     // 3. Match current path against routes
//     let matchedRoute = null;
    
//     for (let route of routeConfig) {
//         if (currentPath === "/" || currentPath.startsWith(route.path)) {
//             matchedRoute = route;
            
//             // Check child routes
//             for (let childRoute of route.children) {
//                 if (childRoute.index && currentPath === "/") {
//                     // Render <Body /> in <Outlet />
//                     return route.element;  // <AppLayout /> with <Body /> inside
//                 }
                
//                 if (currentPath === "/" + childRoute.path) {
//                     // Render <Profile /> in <Outlet />
//                     return route.element;  // <AppLayout /> with <Profile /> inside
//                 }
//             }
//         }
//     }
    
//     return matchedRoute ? matchedRoute.element : <NotFound />;
// }

// Outlet Component Renders Matched Child


// Browser URL: http://localhost:1234/some/path

// window.location.href      // "http://localhost:1234/some/path"
// window.location.origin    // "http://localhost:1234" ← Base URL
// window.location.pathname  // "/some/path" ← Path only
// window.location.host      // "localhost:1234"
// window.location.port      // "1234"


// Simplified Outlet logic

// function Outlet() {
//     // 1. Get current route match from React Router context
//     const currentPath = window.location.pathname;  // "/profile"
    
//     // 2. Find which child route matches
//     let childComponent;
    
//     if (currentPath === "/") {
//         childComponent = <Body />;
//     } else if (currentPath === "/profile") {
//         childComponent = <Profile />;
//     }
    
//     // 3. Render the matched component
//     return childComponent;
// }
// ```

// ## Real Example: Clicking Profile Link

// ### Initial State (at `/`)
// ```
// URL: http://localhost:1234/

// BrowserRouter Context:
// ├── currentPath: "/"
// └── Routes matching...
//     └── Route path="/" → <AppLayout />
//         └── Route index → <Body />

// Rendered Tree:
// <AppLayout>
//     <Header />
//     <Body />      ← Rendered in <Outlet />
//     <Footer />
// </AppLayout>
// ```

// ### After Clicking `<Link to="/profile">`
// ```
// 1. User clicks: <Link to="/profile">Profile</Link>

// 2. Link component:
//    - Prevents default browser navigation
//    - Calls: window.history.pushState({}, '', '/profile')
//    - URL changes to: http://localhost:1234/profile

// 3. BrowserRouter detects URL change:
//    - currentPath is now: "/profile"
//    - Triggers re-render of Routes

// 4. Routes component matches:
//    ✅ Route path="/" matches (parent route)
//    ✅ Route path="profile" matches (child route)
   
// 5. Outlet component renders:
//    - Receives match info: path="/profile", component=<Profile />
//    - Renders <Profile /> instead of <Body />

// 6. Final rendered tree:
// <AppLayout>
//     <Header />
//     <Profile />   ← Changed! Now renders Profile
//     <Footer />
// </AppLayout>


// . **BrowserRouter** provides base URL context (`http://localhost:1234`)
// 2. **Link** prevents page reload and updates browser history
// 3. **Routes** matches current path against route configuration
// 4. **Outlet** renders the matched child component
// 5. **Path matching** is hierarchical (parent → child)

export default AppLayout;

