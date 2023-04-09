//Importando os ícones utilizados na aplicação
import { library } from "@fortawesome/fontawesome-svg-core"
import {
    faCcAmazonPay,
    faCcApplePay,
    faCcDinersClub,
    faCcMastercard,
    faCcVisa,
    faFacebookF,
    faInstagram,
    faPinterestP,
    faTwitter
} from "@fortawesome/free-brands-svg-icons"
import { faHeart, faStar as farStar } from "@fortawesome/free-regular-svg-icons"
import {
    faBars,
    faBoltLightning,
    faCartShopping,
    faCircleRight,
    faLocationArrow,
    faLocationDot,
    faPhoneFlip,
    faUser,
    faXmark,
    faStar as fasStart
} from "@fortawesome/free-solid-svg-icons"

//Injetando todos os ícones dentro da aplicação
library.add(
    faPhoneFlip,
    faLocationDot,
    faUser,
    faBoltLightning,
    faHeart,
    faCartShopping,
    faCircleRight,
    farStar,
    fasStart,
    faFacebookF,
    faInstagram,
    faTwitter,
    faPinterestP,
    faLocationArrow,
    faCcMastercard,
    faCcVisa,
    faCcDinersClub,
    faCcAmazonPay,
    faCcApplePay,
    faBars,
    faXmark
)
