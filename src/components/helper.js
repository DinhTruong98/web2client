import Axios from 'axios';
import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';


export function SendRegisterToServer(registerInfo) {
    Axios.post('http://localhost:8797/register', registerInfo).then((result) => {
        //console.log(result)
        if (result.data.user) {
            alert("Đăng kí thành công, đơn đăng kí của bạn đang được xét duyệt, bạn sẽ được chuyển đến trang đăng nhập")
            window.location.href = "/login";
        }
        else if (result.data.err) {
            alert(result.data.err)
        } else alert("Không thành công, vui lòng kiểm tra lại thông tin đã nhập")

    }).catch(err => {
        alert("Đăng kí không thành công, vui lòng kiểm tra lại thông tin đã nhập")
        throw err
    })
}

export function SendLoginToServer(loginInfo) {
    Axios.post('http://localhost:8797/login', loginInfo).then((result) => {
        console.log(result)
        if (result.data.user) {
            localStorage.setItem('user', JSON.stringify(result.data.user));
            if (result.data.user.role === 'admin') {
                window.location.href = "/admin";
            } else window.location.href = "/partner"
        }
        else if (result.data.err) {
            alert(result.data.err)
        } else alert("Không thành công, vui lòng kiểm tra lại thông tin đã nhập")

    }).catch(err => {
        alert("Đăng nhập không thành công, vui lòng kiểm tra lại thông tin đã nhập")
        throw err
    })
}

export function IsLoggedIn() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) return true
    else return false;
}

export function CheckRole() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user.role;
}

export function GetAllUser(userList) {
    Axios.get('http://localhost:8797/users').then(result => {
        userList = JSON.stringify(result.data.userList);
        localStorage.setItem('userList', userList)
    }).catch(err => { throw err })
    return userList;
}

export class RoutingMachine extends MapLayer {
    createLeafletElement(props) {
        const { map, from, to } = this.props
        return L.Routing.control({
            position: 'topleft',
            waypoints: [
                L.latLng(from[0], from[1]),
                L.latLng(to[0], to[1]),
            ],
        }).addTo(map).getPlan()
    }
}

export function distance (lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
