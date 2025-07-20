import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import CrudService from '../../service/crudService'
import type { PostType } from '../../service/crudService'

function EditPost() {



    const { id } = useParams()
    const [post, setPost] = useState<PostType>();

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            const resp = await CrudService.getPost(String(id))
            setPost(resp)
            console.log(post);
            setTitle(resp ? resp?.title : '')
            setBody(resp ? resp?.body : '')
            return post;
        }
        fetchUser();
    }, [])

    const { handleSubmit, formState: { errors }, register, reset } = useForm<{ title: string; body: string }>({
        defaultValues: {
            title,
            body
        }
    })

    const navigator = useNavigate()

    useEffect(() => {
        if (title && body) {
            reset({ title, body })
        }
    }, [title, body, reset])


    const submitHandler = async (data: { title: string, body: string }) => {
        console.log("submit function called : ", data);
        CrudService.updatePost(String(id), data.title, data.body)
        navigator(`/post/${id}`)
    }

    return (
        <Card className="sm:max-w-xl m-5 sm:w-full sm:mx-auto  bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden mt-8 mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
                <CardTitle className="text-2xl font-bold text-white">Update the Post</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Title</label>
                        <Input
                            {...register("title", { required: "Title is required" })}
                            placeholder="Post title"
                            className="w-full"

                        />
                        {typeof errors.title?.message === "string" && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.title.message}</span>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Body</label>
                        <Textarea
                            {...register("body", { required: "Body is required" })}
                            placeholder="Write your post here..."
                            rows={6}
                            className="w-full"

                        />
                        {typeof errors.body?.message === "string" && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.body.message}</span>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium cursor-pointer"
                    >
                        Update Post
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
export default EditPost

