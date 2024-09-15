import { Mask } from "react-daisyui";

type Props = {
  userImage: string;
};

export default function UserImage({ userImage }: Readonly<Props>) {
  return (
    <Mask className="size-16 bg-white" variant="squircle" src={userImage} />
  );
}
