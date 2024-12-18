import Image from "next/image";

interface EmptyProps {
    label: string;
}

const Empty: React.FC<EmptyProps> = ({ label }) => {
    return (
      <div className="h-full p-20 flex flex-col items-center justify-center">
         <div className="relative h-80 w-80">
           <Image 
           alt="Empty"
           fill
           src="/images.png"
           />
         </div>
         <p className="text-muted-foreground text-sm text-center p-2 ">{label}</p>
      </div>
    );
  };
export default Empty