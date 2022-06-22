import '../styles/globals.css'
import Wrapper from "../ext/wrapper/Wrapper";
import ENV from "../env";

function MyApp({Component, pageProps}) {

    return (

            <Wrapper
                titles={{
                    '/': 'SIS-AEB',

                    'auth': 'SIS-AEB | Entrar',
                    "/unit": "SIS-AEB | Unidade"
                }}
                host={ENV.URLS.auth_host}
                pages={[
                    {label: 'Início', path: '/'},
                    // {label: 'Ramais', path: '/', requireAuth: false}
                ]}
            >
                <Component {...pageProps}/>
            </Wrapper>

    )
}

export default MyApp