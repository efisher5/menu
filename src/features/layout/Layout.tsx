import { Outlet, useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMortarPestle } from "@fortawesome/free-solid-svg-icons";
import layoutStyles from  "./Layout.module.css";
import "../../global.css";
import { useState } from "react";

export default function Layout() {
    const navigate = useNavigate();
    const { logout, user } = useAuth0();

    const [displayUserActions, setDisplayUserActions] = useState(false);

    const returnHome = () => {
        const route = '/';
        navigate(route);
    }

    return (
        <>
        {/* Header */}
        <header className={layoutStyles.header}>
            <div className={layoutStyles.headerContent}>
                <div className={layoutStyles.homeBtnContainer}>
                        <button className={`${layoutStyles.homeBtn} base-btn`} onClick={returnHome}>
                            <FontAwesomeIcon icon={faMortarPestle} size="2x" className={layoutStyles.homeIcon} />
                            <h1 className={layoutStyles.title}>Recipease</h1>
                        </button>
                    </div>
                <div className={layoutStyles.userContainer}>
                    <div className={layoutStyles.user}>Hi { user?.name }</div>
                    <div>
                        <button id={layoutStyles.logoutBtn} className="base-btn" onClick={() => setDisplayUserActions(!displayUserActions)}>
                            <FontAwesomeIcon icon={faBars} size="2x" />
                        </button>
                        {
                        displayUserActions && 
                        <div className={layoutStyles.userActions}>
                            <div className={layoutStyles.userActionBtn} role="button" onClick={() => logout({ logoutParams: { returnTo: 'http://localhost:3001/login' } })}>Log Out</div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </header>
        
        {/* Body */}
        <div className={layoutStyles.body}>
            <Outlet />
        </div>
        
        {/* Footer */}
        {/*<footer className={layoutStyles.footer}>
             <div className="pt-1">© Evan Fisher 2023</div> 
    </footer>*/}
        </>
    )
}