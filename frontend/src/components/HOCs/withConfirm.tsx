"use client";

import {
    ForwardRefExoticComponent,
    FunctionComponent,
    ReactNode,
    RefAttributes,
    useEffect,
    useRef,
    useState,
} from "react";
import { ButtonProps } from "../UI/Button/Button.types";
import Button from "../UI/Button/Button";

export type ButtonComponent = typeof Button;
export type ButtonComponentProps = RefAttributes<HTMLButtonElement> & ButtonProps;
export interface ButtonWithConfirmationProps extends ButtonComponentProps {
    onRequestConfirm?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    forceCancel?: boolean;
    cancelOnBlur?: boolean;
    confirmPrompt?: ReactNode;
}

const withConfirm = (Button: ButtonComponent) => {
    const ButtonWithConfirmation = (props: ButtonWithConfirmationProps) => {
        const {
            children,
            cancelOnBlur,
            confirmPrompt,
            forceCancel,
            onRequestConfirm,
            onConfirm,
            onCancel,
            ...buttonProps
        } = props;
        const [isConfirming, setIsConfirming] = useState(false);
        const buttonRef = useRef<HTMLButtonElement | null>(null);

        // check if we should cancel the confirmation based on some state change in the parent
        if (forceCancel && isConfirming) {
            setIsConfirming(false)
        }

        const handleClick = () => {
            if (!isConfirming) {
                onRequestConfirm?.();
                setIsConfirming(true);
                if (buttonRef.current && cancelOnBlur) {
                    buttonRef.current.focus();
                    buttonRef.current.addEventListener("blur", () => {
                        setIsConfirming(false);
                    });
                }
            } else if (isConfirming) {
                onConfirm?.();
                setIsConfirming(false);
            }
        };

        useEffect(() => {
            if (isConfirming) {
                onCancel?.();
            }
        }, [isConfirming])

        return (
            <Button {...buttonProps} onClick={handleClick} ref={buttonRef}>
                {isConfirming ? confirmPrompt ?? children : children}
            </Button>
        );
    };

    return ButtonWithConfirmation;
};

export default withConfirm;
