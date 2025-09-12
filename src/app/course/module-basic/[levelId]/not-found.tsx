
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-lg text-center border-2 shadow-lg">
            <CardHeader>
                <div className="mx-auto bg-destructive p-4 rounded-full w-fit mb-4">
                  <AlertTriangle className="h-10 w-10 text-destructive-foreground"/>
                </div>
                <CardTitle className="text-4xl font-black">404 - Materi Tidak Ditemukan</CardTitle>
                <CardDescription className="text-base">Maaf, kami tidak dapat menemukan materi yang Anda cari.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Mungkin ada kesalahan pengetikan di URL atau materi tersebut belum tersedia.</p>
            </CardContent>
            <CardFooter>
                 <Button asChild className="w-full">
                    <Link href="/course/module-basic">Kembali ke Pilihan Level</Link>
                </Button>
            </CardFooter>
        </Card>
    </div>
  )
}
