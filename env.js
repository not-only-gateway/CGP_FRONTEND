export default class ENV {
    static SMTP(host, port, secure, {user, pass}) {
        return {
            host: host,
            port: port,
            secure: secure,
            auth: {
                user: user,
                pass: pass
            }
        }
    }

    static get URLS() {
        return {
            "host": "http://192.168.1.188:443",
            "auth_host": "http://192.168.1.184:80"
        }
    }

}