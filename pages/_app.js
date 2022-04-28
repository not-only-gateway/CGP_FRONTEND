import '../styles/globals.css'
import page from '../public/page.json'
import Wrapper from "../ext/wrapper/Wrapper";

function MyApp({Component, pageProps}) {

    return (<Wrapper
        titles={{
            '/': 'SIS-AEB'
        }}
        host={page.auth_host}
        pages={[{label: 'Início', path: '/', requireAuth: true}]}
    >
        <div style={{paddingTop: '8px'}}>
            <Component {...pageProps}/>
        </div>
    </Wrapper>)
}

export default MyApp