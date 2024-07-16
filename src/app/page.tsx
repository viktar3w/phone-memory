import Image from "next/image";
import { ArrowRight, Check, Star } from "lucide-react";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import Phone from "@/components/common/Phone";
import DefaultReviewWrapper from "@/components/review/DefaultReviewWrapper";
import UnderlineTitle from "@/components/common/UnderlineTitle";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pt-24 lg:pb-52 xl:gap-x-8 xl:pt-32">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="absolute -top-20 left-0 hidden w-28 lg:block">
                <Image
                  src="/snake-1.png"
                  alt="snake one"
                  className="w-full"
                  fill
                />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{" "}
                <span className="bg-green-600 px-2 text-white">Custom</span>{" "}
                Phone Case
              </h1>
              <p className="mt-8 max-w-prose text-center text-lg text-balance md:text-wrap lg:pr-10 lg:text-left">
                Capture your favorite memories with your own,{" "}
                <span className="font-semibold">one-of-one</span> phone case.
                Case CaseCobra allows you to protect your memories, not just
                your phone case.
              </p>
              <ul className="mt-8 flex flex-col items-center text-left font-medium space-y-2 sm:items-start">
                <div className="space-y-2">
                  <li className="flex items-center text-left gap-1.5">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    High-quality, durable material
                  </li>
                  <li className="flex items-center text-left gap-1.5">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />5 years
                    print guarantee
                  </li>
                  <li className="flex items-center text-left gap-1.5">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>
              <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                <div className="flex -space-x-4">
                  <Image
                    src="/users/user-1.png"
                    alt="user one"
                    className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-state-100"
                    width={10}
                    height={10}
                  />
                  <Image
                    src="/users/user-2.png"
                    alt="user two"
                    className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-state-100"
                    width={10}
                    height={10}
                  />
                  <Image
                    src="/users/user-3.png"
                    alt="user three"
                    className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-state-100"
                    width={10}
                    height={10}
                  />
                  <Image
                    src="/users/user-4.jpg"
                    alt="user fourth"
                    className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-state-100"
                    width={10}
                    height={10}
                  />
                  <Image
                    src="/users/user-5.jpg"
                    alt="user fifth"
                    className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-state-100"
                    width={10}
                    height={10}
                  />
                </div>
                <div className="flex flex-col items-center justify-between sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 fill-green-600 text-green-600" />
                    <Star className="h-4 w-4 fill-green-600 text-green-600" />
                    <Star className="h-4 w-4 fill-green-600 text-green-600" />
                    <Star className="h-4 w-4 fill-green-600 text-green-600" />
                    <Star className="h-4 w-4 fill-green-600 text-green-600" />
                    <Star className="h-4 w-4 fill-green-600 text-green-600" />
                  </div>
                  <p>
                    <span className="font-semibold">1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full mt-32 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0 lg:col-span-1 lg:mx-0 lg:mt-20">
            <div className="relative md:max-w-xl">
              <img
                src="/your-image.png"
                alt="your image"
                className="absolute -top-20 left-56 hidden w-40 select-none sm:block lg:hidden lg:w-52 xl:block"
              />
              <img
                src="/line.png"
                alt="line"
                className="absolute -bottom-6 -left-6 w-20 select-none lg:w-52"
              />
              <Phone className="w-64" imgSrc="/testimonials/1.jpg" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      {/* value proposition section */}
      <section className="bg-slate-100 py-24 grainy-dark">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row">
            <UnderlineTitle
              messageOne="What our"
              messageTwo="customers"
              messageThree="say"
            />
            <img
              src="/snake-2.png"
              className="w-24 order-0 lg:order-2"
              alt="snake"
            />
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mb-2 flex gap-0.5">
                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                <Star className="h-5 w-5 fill-green-600 text-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  "The case feels durable and I even got a compliment on the
                  design. Had the case for two and a half months now and{" "}
                  <span className="bg-slate-800 text-white p-0.5">
                    the image is super clear
                  </span>
                  , on the case I had before, the image started fading into
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  yellow-ish color after a couple weeks. Love it."
                </p>
              </div>
              <div className="mt-2 flex gap-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="/users/user-1.png"
                  alt="user"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Jonathan</p>
                  <div className="flex items-center text-zinc-600 gap-1.5">
                    <Check className="h-4 w-4 text-green-600 stroke-[3px]" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* second user review */}
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mb-2 flex gap-0.5">
                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                <Star className="h-5 w-5 fill-green-600 text-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  "I usually keep my phone together with my keys in my pocket
                  and that led to some pretty heavy scratchmarks on all of my
                  last phone cases. This one, besides a barely noticeable
                  scratch on the corner,{" "}
                  <span className="bg-slate-800 text-white p-0.5">
                    looks brand new after about half a year
                  </span>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}.
                  I dig it."
                </p>
              </div>
              <div className="mt-2 flex gap-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="/users/user-4.jpg"
                  alt="user"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Josh</p>
                  <div className="flex items-center text-zinc-600 gap-1.5">
                    <Check className="h-4 w-4 text-green-600 stroke-[3px]" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
        <div className="pt-16">
          <DefaultReviewWrapper />
        </div>
      </section>
      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <UnderlineTitle
                messageOne="Upload your photo and get"
                messageTwo="your case"
                messageThree="now"
              />
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-6 lg:x-8">
            <div className="relative flex grid-cols-2 flex-col items-center gap-40 md:grid">
              <img
                src="/arrow.png"
                alt="arrow"
                className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rotate-90 top-[25rem] md:top-1/2 md:rotate-0"
              />
              <div className="relative h-80 ms:h-full w-full max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 md:justify-self-end lg:rounded-2xl">
                <img
                  src="/horse.jpg"
                  alt="horse"
                  className="h-full w-full rounded-md bg-white object-cover shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
              <Phone imgSrc="/horse_phone.jpg" className="w-60" />
            </div>
          </div>
          <ul className="mx-auto mt-12 w-fit max-w-prose space-y-2 sm:text-lg">
            <li className="w-fit">
              <Check className="inline h-5 w-5 text-green-600 mr-1.5" />
              High-quality silicone material
            </li>
            <li className="w-fit">
              <Check className="inline h-5 w-5 text-green-600 mr-1.5" />
              Scratch- and fingerprint resistant coating
            </li>
            <li className="w-fit">
              <Check className="inline h-5 w-5 text-green-600 mr-1.5" />
              Wireless charging compatible
            </li>
            <li className="w-fit">
              <Check className="inline h-5 w-5 text-green-600 mr-1.5" />5 years
              print warranty
            </li>
            <div className="flex justify-center">
              <Link
                href="/configure/upload"
                className={buttonVariants({
                  size: "lg",
                  className: "mx-auto mt-8",
                })}
              >
                Create your case now <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
