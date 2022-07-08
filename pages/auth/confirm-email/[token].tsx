import Image from "next/image";
import { useRouter } from "next/router"
import { Header } from "../../../components";

export default function ConfirmEmail() {

	const router = useRouter();
	const { token } = router.query;

	const handleSubmit = async () => {

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/confirm-email/${token}`);
			const data = await res.json();

			if (res.status !== 201) {
				throw new Error(data.validations[0].msg);
			} else {
				alert("Hemos confirmado tu cuenta. Por favor inicia sesión para continuar.");
				router.push("/auth/login");
			}
		} catch(error) {
			alert(error);
		}
	}

	return (
		<>
			<Header title="Confirma tu cuenta" />

			<header className="container text-center mx-auto md:mt-10">
				<Image alt="Logo" src="/img/logo.png" className="mx-auto mt-5" width={125} height={125} />
				<h1 className="text-rojo font-bold text-4xl my-7">Confirma tu cuenta</h1>
				<h2 className="font-bold text-xl">¡Felicidades!</h2>
			</header>

			<main className="container mt-16 mx-auto flex items-center flex-col justify-center xl:w-1/2">
				<p className="text-lg text-center">Tu cuenta ya está lista </p>
				<p className="text-lg pt-3 mb-16">Solo debes confirmarla en el siguiente enlace:</p>
				<button 
					onClick={handleSubmit}
					className="bg-rojo px-4 text-white py-3 rounded-2xl font-bold text-center"
				>
					Confirmar cuenta
				</button>
			</main>
		</>
	);
}