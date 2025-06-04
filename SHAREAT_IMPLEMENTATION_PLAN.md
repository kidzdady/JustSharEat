# SharEat Website - Implementation Plan

This document outlines the plan to address missing pages, broken navigation, and non-functional buttons in the SharEat website.

**Current Status:**
*   Homepage ([`src/app/page.tsx`](src/app/page.tsx)) navigation to [`/select-role`](src/app/select-role/page.tsx) and [`/auth`](src/app/auth/page.tsx) is functional.
*   Navigation from [`/select-role`](src/app/select-role/page.tsx) to [`/auth`](src/app/auth/page.tsx) is functional *after a temporary manual simplification* of the link content (replacing `Card` components with plain text).
*   The authentication flow via [`/auth`](src/app/auth/page.tsx) (using Google Sign-In) and subsequent redirection to user-specific dashboards appears to be working.
*   The primary issue for initial navigation blockage on the [`select-role`](src/app/select-role/page.tsx) page was likely interference from the `Card` components with the Next.js `Link` components.

---

**Revised Implementation Plan:**

**Phase 1: Establish Core Structure & Basic Navigation**

1.  **Goal: Create All Missing Page and Layout Files.**
    *   **Action 1.1:** Systematically create the file structure for all missing pages and layouts identified earlier with basic placeholder content.
        *   **Missing Root Level Pages:**
            *   [`src/app/error.tsx`](src/app/error.tsx)
            *   [`src/app/not-found.tsx`](src/app/not-found.tsx)
            *   [`src/app/donate/page.tsx`](src/app/donate/page.tsx)
            *   [`src/app/impact/page.tsx`](src/app/impact/page.tsx)
            *   [`src/app/profile/page.tsx`](src/app/profile/page.tsx)
            *   [`src/app/notifications/page.tsx`](src/app/notifications/page.tsx)
            *   [`src/app/support/page.tsx`](src/app/support/page.tsx)
            *   [`src/app/about/page.tsx`](src/app/about/page.tsx)
            *   [`src/app/how-it-works/page.tsx`](src/app/how-it-works/page.tsx)
            *   [`src/app/safety/page.tsx`](src/app/safety/page.tsx)
            *   [`src/app/legal/page.tsx`](src/app/legal/page.tsx)
        *   **Missing Auth:**
            *   [`src/app/auth/layout.tsx`](src/app/auth/layout.tsx)
        *   **Missing Consumer:**
            *   [`src/app/consumer/map/page.tsx`](src/app/consumer/map/page.tsx)
        *   **Missing Seller:**
            *   [`src/app/seller/upload/page.tsx`](src/app/seller/upload/page.tsx)
            *   [`src/app/seller/analytics/page.tsx`](src/app/seller/analytics/page.tsx)
        *   **Missing NGO:**
            *   [`src/app/ngo/wishlist/page.tsx`](src/app/ngo/wishlist/page.tsx)
        *   **Missing Admin (Entire Section):**
            *   [`src/app/admin/layout.tsx`](src/app/admin/layout.tsx)
            *   [`src/app/admin/page.tsx`](src/app/admin/page.tsx)
            *   [`src/app/admin/users/page.tsx`](src/app/admin/users/page.tsx)
            *   [`src/app/admin/verification/page.tsx`](src/app/admin/verification/page.tsx)
2.  **Goal: Implement Basic Layout Navigation.**
    *   **Action 1.2:** Review and implement functional navigation links within the main layout components: [`Header`](src/components/layout/Header.tsx), [`Footer`](src/components/layout/Footer.tsx).
    *   **Action 1.3:** Determine where the [`Sidebar`](src/components/layout/Sidebar.tsx) and [`BottomNav`](src/components/layout/BottomNav.tsx) components are used (e.g., in specific role layouts like [`consumer/layout.tsx`](src/app/consumer/layout.tsx)) and ensure their links are functional, connecting to the newly created pages where appropriate.
3.  **Goal: Permanently Fix `select-role` Page Navigation.**
    *   **Action 1.4:** Investigate *why* the original [`Card`](src/components/ui/Card.tsx) component setup was interfering with the `Link` functionality in [`src/app/select-role/page.tsx`](src/app/select-role/page.tsx). This will likely involve checking CSS (e.g., `z-index`, `position`) and JavaScript event handlers within the [`Card`](src/components/ui/Card.tsx).
    *   **Action 1.5:** Implement a robust fix to restore the visual [`Card`](src/components/ui/Card.tsx) design while ensuring it navigates correctly.

**Phase 2: Implement Page Content and Component Functionality**
*   Populate the newly created pages with their intended content and UI components.
*   Address specific button functionalities on a page-by-page, component-by-component basis, connecting them to the necessary logic (e.g., form submissions, API calls, context updates).
*   Ensure interlinking between all pages works as per the user flow diagrams.

**Phase 3: Features, APIs, and Advanced Functionality**
*   Integrate external APIs (M-PESA, Google Maps, Blockchain, AR.js, Twilio, OpenAI).
*   Develop and integrate complex feature components ([`MapView`](src/components/features/MapView.tsx), [`PaymentForm`](src/components/features/PaymentForm.tsx), [`ARPreview`](src/components/features/ARPreview.tsx), etc.).
*   Implement backend logic required for these features.

**Phase 4: Testing, Refinement, and Deployment Prep**
*   Comprehensive end-to-end testing of all user flows.
*   UI/UX refinement and responsive design checks.
*   Performance optimization.
*   Security reviews (including Firestore rules).
*   Prepare documentation and deployment scripts.

---

**Visual Plan (Mermaid Diagram):**

```mermaid
graph TD
    subgraph Current Status
        A[Homepage & Auth Flow Working with Temp. Simplified Role Links]
    end

    subgraph Phase 1: Establish Core Structure & Basic Navigation
        B(Action 1.1: Create All Missing Page/Layout Files) --> C(Action 1.2: Implement Navigation in Header/Footer)
        C --> D(Action 1.3: Implement Navigation in Sidebar/BottomNav for Role Layouts)
        D --> E(Action 1.4 & 1.5: Investigate & Fix Card/Link Interference on select-role Page)
        E --> F{Original Card Design Navigates?}
        F -- Yes --> G[Phase 1 Complete]
        F -- No --> E
    end

    subgraph Phase 2: Content & Component Functionality
        H[Populate Page Content & UI]
        I[Fix/Implement Button Functionality (Page by Page)]
        J[Ensure All Page Interlinking]
    end

    subgraph Phase 3: Features & APIs
        K[Integrate External APIs]
        L[Develop Complex Feature Components]
        M[Implement Backend Logic for Features]
    end

    subgraph Phase 4: Testing & Refinement
        N[End-to-End Testing]
        O[UI/UX Refinement & Optimization]
        P[Security & Deployment Prep]
    end

    Q[Fully Functional SharEat Website]

    A --> B
    G --> H
    H --> I
    I --> J
    J --> K
    K --> L
    L --> M
    M --> N
    N --> O
    O --> P