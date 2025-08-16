import Img from '@/components/ui/img';

type Props = {
  images: { src: string; alt?: string }[];
  howMany: string;
  remark: string;
};

export default function SoMany({ images, howMany, remark }: Props) {
  return (
    <div className='flex items-center'>
      <div className='flex'>
        {images.map(({ src, alt }, idx) => (
          <Img
            key={src}
            src={src}
            alt={alt || src}
            className={`w-[40px] rounded-full border translate-x-[-${idx * 20}px]`}
          />
        ))}
      </div>
      <div className='border-l-[1px] pl-5'>
        <strong>{howMany}</strong> {remark}
      </div>
    </div>
  );
}
