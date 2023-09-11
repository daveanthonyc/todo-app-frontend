import { useContext } from "react"
import { Context } from "../../App"

function ToggleTheme() {
    const [ isLightTheme, setIsLightTheme ] = useContext(Context)

    return <button className="main-toggle" data-theme={isLightTheme} onClick={() => setIsLightTheme(!isLightTheme)}>

    </button>
}

export default ToggleTheme