import React, { useEffect, useState } from "react";
import { setTheme } from "../../../themes/Themes";
import Switch from "react-ios-switch";

export default function Toggle() {
    const [checked, setChecked] = useState(true);
    const handleOnClick = () => {
        if (localStorage.getItem("theme") === "theme-dark") {
            setTheme("theme-light");
            setChecked(false);
        } else {
            setTheme("theme-dark");
            setChecked(true);
        }
    };
    useEffect(() => {
        if (localStorage.getItem("theme")) {
            if (localStorage.getItem("theme") === "theme-dark") {
                setChecked(true);
            } else {
                setChecked(false);
            }
        } else {
            setChecked(true);
        }
    }, []);

    return (
        <div id="light_dark">
            <div id="lightIcon">
                <svg
                    className="svg-theme"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path d="M 11 0 L 11 3 L 13 3 L 13 0 L 11 0 z M 4.2226562 2.8085938 L 2.8085938 4.2226562 L 4.9296875 6.34375 L 6.34375 4.9296875 L 4.2226562 2.8085938 z M 19.777344 2.8085938 L 17.65625 4.9296875 L 19.070312 6.34375 L 21.191406 4.2226562 L 19.777344 2.8085938 z M 12 5 C 8.1458514 5 5 8.1458514 5 12 C 5 15.854149 8.1458514 19 12 19 C 15.854149 19 19 15.854149 19 12 C 19 8.1458514 15.854149 5 12 5 z M 12 7 C 14.773268 7 17 9.2267316 17 12 C 17 14.773268 14.773268 17 12 17 C 9.2267316 17 7 14.773268 7 12 C 7 9.2267316 9.2267316 7 12 7 z M 0 11 L 0 13 L 3 13 L 3 11 L 0 11 z M 21 11 L 21 13 L 24 13 L 24 11 L 21 11 z M 4.9296875 17.65625 L 2.8085938 19.777344 L 4.2226562 21.191406 L 6.34375 19.070312 L 4.9296875 17.65625 z M 19.070312 17.65625 L 17.65625 19.070312 L 19.777344 21.191406 L 21.191406 19.777344 L 19.070312 17.65625 z M 11 21 L 11 24 L 13 24 L 13 21 L 11 21 z" />
                </svg>
            </div>
            <Switch
                onColor="#009625"
                offColor="#ffa600"
                checked={checked}
                onChange={handleOnClick}
            />
            <div id="darkIcon"> 
                <svg
                    className="svg-theme"
                    width="24"
                    height="24"
                    viewBox="0 0 792 792"
                >
                    <path d="M402.336,396c0-170.8,110.855-315.909,265.914-371.473C624.765,8.935,577.986,0,528.957,0     C305.167,0,123.75,177.309,123.75,396c0,218.716,181.417,396,405.207,396c49.029,0,95.808-8.935,139.293-24.527     C513.191,711.909,402.336,566.8,402.336,396z" />
                </svg>
            </div>
        </div>
    );
}
