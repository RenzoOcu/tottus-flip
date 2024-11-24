
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
//2:38:06
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { FormEditCarProps } from "./FormEditCar.types";
import { useToast } from "@/hooks/use-toast";
import { formSchema } from "./FormEditCar.form";

export function FormEditCar(props: FormEditCarProps) {
  const { carData, setOpenDialog } = props;
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: carData.name,
      cv: carData.cv,
      transmission: carData.transmission,
      people: carData.people,
      photo: carData.photo,
      engine: carData.engine,
      type: carData.type,
      priceDay: carData.priceDay,
      isPublish: carData.isPublish ? carData.isPublish : false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
   setOpenDialog(false)

    try {
      await axios.patch(`/api/car/${carData.id}/form`, values);
      toast({ title: "producto editado " });
      router.refresh();
    } catch (error) {
        console.log(error)
      toast({
        title: "error 500 !",
        variant: "destructive",
      });
    }
  };

  const { isValid } = form.formState;

  return (
    <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>producto:</FormLabel>
                                <FormControl>
                                    <Input placeholder="-----" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cv"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>codigo:</FormLabel>
                                <FormControl>
                                    <Input placeholder="-----" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="transmission"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> tipo de producto:</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="-----" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="fruta">fruta</SelectItem>
                                        <SelectItem value="verdura">verdura</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="people"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> rareza del producto:</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="-----" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="comun">comun</SelectItem>
                                        <SelectItem value="frecuente">frecuente</SelectItem>
                                        <SelectItem value="escaso">escaso</SelectItem>
                                        <SelectItem value="limitado">limitado</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="engine"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>estado:</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="-----" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="bueno">bueno</SelectItem>
                                        <SelectItem value="aceptable">aceptable</SelectItem>
                                        <SelectItem value="regular">regular</SelectItem>
                                        <SelectItem value="malo">malo</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>categoria:</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="-----" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="tuverculo">tuverculo</SelectItem>
                                        <SelectItem value="organico">organico</SelectItem>
                                        <SelectItem value="exotico">exotico</SelectItem>
                                        <SelectItem value="humedo">humedo</SelectItem>
                                        <SelectItem value="otro">otro</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>imagen del producto:</FormLabel>
                                <FormControl>
                                    {photoUploaded ? (
                                        <p className="text-sm">imagen subida exitosamente</p>
                                    ) : (
                                        <UploadButton
                                            className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3"
                                            {...field}
                                            endpoint="photo"
                                            onClientUploadComplete={(res) => {
                                                form.setValue("photo", res?.[0].url);
                                                setPhotoUploaded(true);
                                            }}
                                            onUploadError={(error: Error) => {
                                                console.log(error);
                                            }}
                                        />
                                    )}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
            control={form.control}
            name="priceDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>costo:</FormLabel>
                <FormControl>
                  <Input placeholder="----" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



                   <div>
                   <Button type="submit" className="w-full mt-5 disabled"
                   disabled= {!isValid} > editar producto 
        </Button>
        </div>
        </div>
            </form>
        </Form>
  );
}