import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	setFunction: () => void;
}

export function FloatingButton({ children, setFunction }: Props) {
	return (
		<button
			type="button"
			onClick={setFunction}
			className="fixed right-8 bottom-8"
		>
			{children}
		</button>
	);
}
