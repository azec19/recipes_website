"use client"
import Link from 'next/link'
import bg from '@/public/background.png'
import { useState } from 'react';
import { useRouter } from "next/navigation";


export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true);
        try {
            const formData = new FormData(e.currentTarget)
	    const result = await fetch("/register/route_register", {
                method: "POST",
                body: JSON.stringify({
                    name: formData.get("name"),
                    password: formData.get("password")
                }),
                headers: { "Content-Type": "application/json" }
            });
            if (result.ok) {
                setIsLoading(false);
                router.push('/') // redirige vers la page d'accueil
            } else {
                // Affiche le message d'erreur mais garde les données
                setError((await result.json()).message || 'Une erreur est survenue lors de l\'authentification')
            }
        }
        catch (err) {
            setError('Une erreur inattendue est survenue : ' + err)
            console.error(err)
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className="bg-cover bg-center"
                style={{ "backgroundImage": `url(${bg.src})` }}>
                <div className="flex h-screen items-center justify-center">
                    <div className="flex flex-col items-center space-y-8">
                        <div className="w-80 rounded-[20px] bg-white p-8" style={{ "boxShadow": "#00000057 1px 3px 4px" }}>
                            <h1 className="mb-4 text-center text-3xl font-bold text-black" style={{ "textShadow": "#00000063 0px 3px 5px" }}>
                                Bienvenue sur ce site de recettes !
				Vous n'êtes pas censé être sur ce lien. Merci de revenir sur le site.
                            </h1>
                            {error && (
                                <div className="mx-auto w-full max-w-[550px] mb-4">
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                        <strong className="font-bold">Erreur:</strong>
                                        <span className="block sm:inline ml-2">{error}</span>
                                    </div>
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        name="name"
                                        className="w-full rounded-md bg-[#E9EFF6] p-2.5 text-black placeholder:text-[#6B7280]"
                                        style={{ "boxShadow": "rgb(0 0 0 / 21%) 0px 7px 5px 0px" }} />
                                    <input
                                        type="password"
                                        placeholder="Mot de passe"
                                        name="password"
                                        className="w-full rounded-md bg-[#E9EFF6] p-2.5 text-black placeholder:text-[#6B7280]"
                                        style={{ "boxShadow": "rgb(0 0 0 / 21%) 0px 7px 5px 0px" }} />
                                </div>
                                <div className="mb-4 pt-2">
                                </div>
                                <div className="mb-4 flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="h-10 w-full cursor-pointer rounded-md bg-gradient-to-br from-[#e7b100] to-[#745900] text-white shadow-md shadow-yellow-950">
                                        {isLoading ? 'Loading...' : 'Sign Up'}
                                    </button>
                                </div>
                            </form>
                            <div className="text-center text-[#969696]">
                                Vous avez déjà un compte ?
                                <Link className="cursor-pointer text-[#745900] hover:underline" href="/login"
                                >Sign in</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
