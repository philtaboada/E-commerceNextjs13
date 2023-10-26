import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { AiFillTwitterCircle, AiFillInstagram, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Shop Categories</h3>
                        <Link href="#">
                            Celulares
                        </Link>
                        <Link href="#">
                            TVs
                        </Link>
                        <Link href="#">
                            Computadoras
                        </Link>
                        <Link href="#">
                            Tablets
                        </Link>
                        <Link href="#">
                            Audio
                        </Link>
                        <Link href="#">
                            Gaming
                        </Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Servicio al Cliente</h3>
                        <Link href="#">
                            Contáctanos
                        </Link>
                        <Link href="#">
                            Política de Devoluciones
                        </Link>
                        <Link href="#">
                            Preguntas Frecuentes
                        </Link>
                        <Link href="#">
                            Servicio al Cliente
                        </Link>
                        <Link href="#">
                            FAQs
                        </Link>
                    </FooterList>
                    <div className="w-full md:w-1/# mb-6 md:mb-0">
                        <h3 className="text-base font-bold mb-2">Acerca de nosotros</h3>
                        <p className="mb-2">En BabySitter, estamos dedicados a impulsar la innovación tecnológica. Creamos soluciones a medida para tus necesidades tecnológicas, ofreciendo servicios de alta calidad y un enfoque centrado en el cliente.</p>
                        <p>&copy; {new Date().getFullYear()} Babysitter Tdos los derechos reservados</p>
                    </div>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Siguenos</h3>
                        <div className="flex gap-2">
                            <Link href="#">
                                <MdFacebook size={24} />

                            </Link>
                            <Link href="#">
                                <AiFillTwitterCircle size={24} />

                            </Link>
                            <Link href="#">
                                <AiFillInstagram size={24} />

                            </Link>
                            <Link href="#">
                                <AiFillYoutube size={24} />

                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;