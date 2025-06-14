import { SVGProps } from "react";

const TotalListingIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 11H8M10 15H8M16 7H8M20 6.8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H15.2C16.8802 2 17.7202 2 18.362 2.32698C18.9265 2.6146 19.3854 3.07354 19.673 3.63803C20 4.27976 20 5.11984 20 6.8Z"
        stroke="#1D9ACC"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const RefreshIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 20.5001C16.6944 20.5001 20.5 16.6945 20.5 12.0001C20.5 9.17456 19.1213 6.67103 17 5.1255M13 22.4001L11 20.4001L13 18.4001M12 3.5001C7.30558 3.5001 3.5 7.30568 3.5 12.0001C3.5 14.8256 4.87867 17.3292 7 18.8747M11 5.6001L13 3.6001L11 1.6001"
        stroke="#1D9ACC"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const CheckedIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
        stroke="#1D9ACC"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const BoltIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M17.168 8H13l.806-4.835A1 1 0 0 0 12.819 2H7.667a1 1 0 0 0-.986.835l-1.667 10A1 1 0 0 0 6 14h4v8l8.01-12.459A1 1 0 0 0 17.168 8z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
const MailIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M29.5 12V13.2081C29.5 14.3118 28.894 15.3263 27.9223 15.8496L19.2857 20.5M3.5 12V13.2081C3.5 14.3118 4.10597 15.3263 5.0777 15.8496L13.7143 20.5M25.5 23.8462L19.2857 20.5M19.2857 20.5L17.9223 19.7659C17.0344 19.2878 15.9656 19.2878 15.0777 19.7659L13.7143 20.5M13.7143 20.5L7.5 23.8462M29.5 26C29.5 27.6569 28.1569 29 26.5 29H6.5C4.84315 29 3.5 27.6569 3.5 26L3.5 11.7919C3.5 10.6883 4.10597 9.67373 5.0777 9.15049L15.0777 3.76587C15.9656 3.28776 17.0344 3.28776 17.9223 3.76587L27.9223 9.15049C28.894 9.67373 29.5 10.6883 29.5 11.7919V26Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export { TotalListingIcon, RefreshIcon, CheckedIcon, BoltIcon, MailIcon };
