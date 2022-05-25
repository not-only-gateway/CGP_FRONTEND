import '../styles/globals.css'
import page from '../public/page.json'
import Wrapper from "../ext/wrapper/Wrapper";

function MyApp({Component, pageProps}) {

    return (<Wrapper
        titles={{
            '/admin': 'SIS-AEB',
            '/': 'SIS-AEB | Ramais',
            'auth': 'SIS-AEB | Entrar'
        }}
        host={page.auth_host}
        pages={[{label: 'Início', path: '/admin', requireAuth: true, requireAdmin: true}, {label: 'Ramais', path: '/', requireAuth: false}]}
    >
        <div style={{paddingTop: '8px'}}>
            <Component {...pageProps}/>
        </div>
    </Wrapper>)
}

export default MyApp