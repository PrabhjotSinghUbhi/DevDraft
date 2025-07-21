import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import CrudService from '../../service/crudService'
import type { PostType } from '../../service/crudService'
import { IoMdArrowBack } from "react-icons/io";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription } from '../ui/card';
import { Edit, Menu, Trash } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Button } from '../ui/button';
import Loading from '../Loading/Loading';

function PostPage() {

    const { id } = useParams()
    const [post, setPost] = useState<PostType>()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getPost = async () => {
            try {
                const resp = await CrudService.getPost(String(id))
                if (resp != undefined && resp) {
                    setPost(resp)
                }
                setLoading(prev => !prev)
            } catch (err) {
                console.log("Some Error occurred in fetching the data from crud service", err);
            }
        }

        getPost()
    }, [id])

    const navigator = useNavigate()

    const handleDelete = async () => {
        console.log("Handle Delete function called.", "Id passed is", id);

        CrudService.deleteRequest(String(id))
        navigator("/")
    }

    return (
        loading ? (<Loading />) : (
            post ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] px-4">
                    <Card className="max-w-2xl w-full bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition-shadow hover:shadow-2xl duration-300 mt-8 mb-8">
                        <CardHeader className="relative bg-gradient-to-r flex justify-between from-blue-600 to-purple-600 p-6 sm:p-8 rounded-t-2xl">
                            <div>
                                <CardTitle className="text-3xl font-bold text-white mb-1">
                                    {post.title}
                                </CardTitle>
                                <CardDescription className="text-sm text-blue-100">
                                    {post.datetime}
                                </CardDescription>
                            </div>

                            {/* Menu Dropdown Button */}
                            <CardAction className=" top-4 right-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
                                        >
                                            <Menu className="w-5 h-5" />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuPortal>
                                        <DropdownMenuContent
                                            side="bottom"
                                            align="end"
                                            sideOffset={6}
                                            className="z-50 bg-zinc-800 text-white rounded-xl p-2 w-36 shadow-xl border border-zinc-800"
                                        >
                                            <DropdownMenuItem className="flex outline-none items-center gap-3 px-3 py-2 hover:bg-zinc-700 rounded-lg cursor-pointer" onClick={handleDelete}>
                                                <Trash className="text-red-500 w-4 h-4" />
                                                <span>Delete</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => { navigator(`/edit-post/${id}`) }} className="flex items-center outline-none gap-3 px-3 py-2 hover:bg-zinc-700 rounded-lg cursor-pointer">
                                                <Edit className="text-blue-500 w-4 h-4" />
                                                <span>Edit</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenuPortal>
                                </DropdownMenu>
                            </CardAction>

                        </CardHeader>

                        <CardContent className="p-6 sm:p-8 text-gray-800 text-lg leading-relaxed">
                            {post.body}
                        </CardContent>
                    </Card>


                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[40vh] px-4">
                    <article className="max-w-2xl w-full bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden mt-8 mb-8 text-center">
                        <header className="bg-gradient-to-r from-red-600 to-pink-500 p-8 rounded-t-2xl">
                            <h1 className="text-3xl font-bold text-white mb-2">Blog Not Found</h1>
                            <p className="text-sm text-pink-100">The blog you are looking for doesn’t exist or has been deleted.</p>
                        </header>
                        <section className="p-8 text-gray-800 text-lg leading-relaxed">
                            <p className="mb-4">We couldn't find the content you're searching for.</p>
                            <a
                                href="/"
                                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
                            >
                                <IoMdArrowBack className='inline-block' /> Go back home
                            </a>
                        </section>
                    </article>
                </div>
            )
        )
    )

}

export default PostPage
