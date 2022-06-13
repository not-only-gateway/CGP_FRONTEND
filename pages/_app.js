import '../styles/globals.css'
import Wrapper from "../ext/wrapper/Wrapper";
import ENV from "../env";

function MyApp({Component, pageProps}) {

    return (<Wrapper
        titles={{
            '/admin': 'SIS-AEB',
            '/': 'SIS-AEB | Ramais',
            'auth': 'SIS-AEB | Entrar',
            "/unit": "SIS-AEB | Unidade"
        }}
        host={ENV.URLS.auth_host}
        pages={[
            {label: 'Início', path: '/admin', requireAuth: true, requireAdmin: true},
            {label: 'Ramais', path: '/', requireAuth: false}
        ]}
    >
        <Component {...pageProps}/>
    </Wrapper>)
}

export default MyApp