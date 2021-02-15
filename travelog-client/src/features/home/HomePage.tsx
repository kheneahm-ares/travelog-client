import { userManager } from '../../auth/AuthServices'

export const HomePage = () => {

    function signIn()
    {
        userManager.signinRedirect();
    }

    return (
        <div>
            <button onClick={signIn}>Sign In</button>
        </div>
    )
}
