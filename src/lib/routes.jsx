// Main Components
import DashboardComponent from "../components/dashboard";
import RequireAuth from "../components/requireAuth";
import SessionComponent from "../components/session";
import SignInComponent from "../components/session/sign_in";
import SignUpComponent from "../components/session/sign_up";
import ShopComponent from "../components/dashboard/content_section/shop";
import NotFoundComponent from "../components/notFound";
// Dashboard components
import HomeSectionComponent from "../components/dashboard/content_section/home";
import AdvanceSectionComponent from "../components/dashboard/content_section/advance";
import SecuritySectionComponent from "../components/dashboard/content_section/security";
import ConfigurationSectionComponent from "../components/dashboard/content_section/configuration";

const MAIN = [
    {
        url: "/signin",
        component: SessionComponent(SignInComponent),
        exact: true
    },
    {
        url: "/signup",
        component: SessionComponent(SignUpComponent),
        exact: true
    },
    {
        url: "/404",
        component: NotFoundComponent,
        exact: true
    },
    {
        url: "/",
        component: RequireAuth(DashboardComponent),
        exact: false
    }
];

const LATERAL = {
    NAVIGATION: [
        {
            text: "Inicio",
            icon: "home",
            url: "/",
            component: HomeSectionComponent,
            exact: true
        },
        {
            text: "Super Avance",
            icon: "credit-card",
            url: "/super-avance",
            component: AdvanceSectionComponent,
            exact: true
        },
        {
            text: "Seguridad",
            icon: "lock",
            url: "/seguridad",
            component: SecuritySectionComponent,
            exact: true
        },
        {
            text: "Configuración",
            icon: "setting",
            url: "/configuracion",
            component: ConfigurationSectionComponent,
            exact: true
        },
        {
            text: "Tienda",
            icon: "shop",
            url: "/:id&:slug",
            component: ShopComponent,
            exact: true,
            onlyRoute: true
        }
    ]
};

export const ROUTES = {
    MAIN,
    LATERAL
};