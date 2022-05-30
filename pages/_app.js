import '../styles/globals.css'
import Wrapper from "../ext/wrapper/Wrapper";
import ENV from "../env";

function MyApp({Component, pageProps}) {

    return (<Wrapper
        titles={{
            '/admin': 'SIS-AEB',
            '/': 'SIS-AEB | Ramais',
            'auth': 'SIS-AEB | Entrar'
        }}
        host={ENV.URLS.auth_host}
        pages={[{label: 'Início', path: '/admin', requireAuth: true, requireAdmin: true}, {label: 'Ramais', path: '/', requireAuth: false}]}
    >
        <div style={{paddingTop: '8px'}}>
            <Component {...pageProps}/>
        </div>
    </Wrapper>)
}

export default MyApp