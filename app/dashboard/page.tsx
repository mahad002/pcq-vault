
import Image from 'next/image'
import Link from 'next/link'

export default function Dashboard() {
    return (
        <>
        <div className='text-black bg-blue-100 header flex justify-center items-center'>
            <video className="min-w-full h-[91vh] absolute object-cover"
            src='/video.mp4'
            autoPlay
            muted
            loop
            >
            </video>
            <div className='grid grid-cols-2 p-5' style={{zIndex:1}}>
                <Image className='mx-auto justify-center'
                src='/logo_white.png'
                width={700}
                height={700}
                alt='Logo' />
                <div className='flex flex-col text-white justify-center'>
                    <h1 className='text-5xl  font-bold '>Quantum Vulnerability Scanning Tool</h1>
                    <p className='text-justify py-3 space-x-3'>QuVolt is a web application designed to scan code stacks and web connections with unrivaled precision. Identify quantum vulnerable crytographic implementations and protocols effortlessly. ChecQ helps an individual or corporation in preparing for transition to quantum safe crytography.</p>
                </div>

            </div>
        </div>
        <div className='h-screen p-10 bg-white'>
            <div>
                <h1 className='text-4xl font-bold text-center p-3'>Transition to Quantum-Safe Security:Prepare with QuVolt</h1>

            </div>
            <div className="space-y-5">
                <h2 className="text-2xl text-center font-semibold p-5">
                    The vulnerability of conventional cryptographic implementations to quantum computers is no longer a question of &quot;how&quot; but &quot;when&quot;.
                </h2>
            </div>
            <div className="grid grid-cols-2 items-center p-5 py-8">
                <div>
                    <h1 className="text-xl test-center p-10">
                        Leverage QuVolt&apos;s profound expertise in identifying cryptographic vulnerabilities and fortify your security infrastructure for the imminent transition to post-quantum cryptography (PQC) algorithms. Keep your systems safeguarded and stay one step ahead of emerging threats with our dedicated support in implementing quantum-resistant measures.
                    </h1>
                </div>
                <div>
                    <Image
                        className="mx-auto justify-center"
                        src="/img1.png"
                        width={500}
                        height={500}
                        alt="image1"
                    />
                </div>
            </div>
        </div>
        <div className='h-screen bg-gray-200 p-10 py-10'>
            <div>
                <h1 className='text-4xl font-bold text-center'>Our Applications</h1>
                <h2 className='text-2xl font-medium text-center p-3'>Fortify your applications for the Quantum Computing Era with QuVolt. Uncover Vulnerabilities, Embrace enhanced security amd build a resilient cryptographic foundation to safeguard your system in the face of evolving technologies.</h2>
                <h3 className='text-xl font-medium text-center'>Give a try to our quantum vulnerability scanning tool.</h3>
            </div>
            <div className='grid grid-cols-2 items-center p-5 py-8'>
                <div>
                <Link href='/url'>
                    <Image className='mx-auto justify-center'
                        src = '/url.png'
                        width={300}
                        height={300}
                        alt='scan'
                        />
                    </Link>
                    <h1>Scan web applications for quantum vulnerabilities and gain insights into cryptographic weaknesses, including weak, strong, and recommended cipher suites. Additionally, compare the security of cipher suites in both pre-quantum and post-quantum contexts.</h1>

                </div>
                <div>
                    <Link href='/code'>
                    <Image className='mx-auto justify-center'
                        src = '/code.png'
                        width={300}
                        height={300}
                        alt='scan'
                        />
                    </Link>
                    
                    <h1 className='text-justify px-3 py-4'>Search for quantum-vulnerable encryption, signature and hash algorithms or gain additional context on the threat landscape with QuVolt.</h1>

                </div>
            </div>


        </div>
        </>
    )
    
}