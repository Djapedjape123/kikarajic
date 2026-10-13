"use client";

/* eslint-disable @next/next/no-img-element -- slike optimizuje Cloudinary (lib/cloudinary.ts), isto kao na ostatku sajta */

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import ServiceLightbox, { useLightbox, type LightboxImage } from "@/components/services/ServiceLightbox";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

const TILE_WIDTH = 700;

// Mreža pločica + lightbox preko celog ekrana. Za ponovno korišćenje na stranicama usluga (Sprej ten, Šminka).
export default function ServiceGallery({ images }: { images: LightboxImage[] }) {
  const lightbox = useLightbox();

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {images.map((image, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={(event) => lightbox.openAt(i, event)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
            // svaka druga pločica je pomerena naniže
            className={`group relative aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-3xl bg-stone-200 shadow-md ${
              i % 2 === 1 ? "mt-6 sm:mt-10" : ""
            }`}
          >
            <img
              src={optimizeCloudinaryUrl(image.src, TILE_WIDTH)}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors group-hover:bg-[#bc1888]"
            >
              <Maximize2 size={16} />
            </span>
          </motion.button>
        ))}
      </div>

      <ServiceLightbox images={images} lightbox={lightbox} />
    </>
  );
}
