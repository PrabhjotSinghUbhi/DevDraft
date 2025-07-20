import React from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { IoMdArrowBack } from "react-icons/io";

const Missing = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <Card className="max-w-2xl w-full border border-gray-200 rounded-2xl shadow-lg overflow-hidden mt-8 mb-8">
                <header className="bg-gradient-to-r from-red-500 to-pink-500 p-8 rounded-t-2xl text-center">
                    <div className="flex flex-col items-center space-y-2">
                        <AlertCircle className="h-10 w-10 text-white" />
                        <h1 className="text-3xl font-bold text-white">404 - Blog Not Found</h1>
                        <p className="text-white text-sm">Oops! We couldn’t find the blog you’re looking for.</p>
                    </div>
                </header>

                <CardContent className="p-6 text-center">
                    <Button
                        onClick={() => navigate("/")}
                        className="w-full text-slate-900 hover:text-white bg-gray-100 transition-colors duration-400 ease-in-out cursor-pointer  max-w-sm mx-auto hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500">
                        <IoMdArrowBack className="inline-block" /> Go Back Home
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Missing
