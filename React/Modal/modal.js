import "../../stylesheets/Modal.css";
import {FaTimes} from "react-icons/fa";
import { useEffect, useRef, useCallback } from "react";
import {createPortal} from "react-dom";
import useFocusTrap from "../hooks/useFocusTrap";

export default function Modal({onClose, onSave, title="Modal", children}){
    const ref = useRef();
    
    useEffect(()=>{
        ref.current.focus();
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return ()=> document.body.style.overflow = prevOverflow;
    }, []);

    const onKey = useCallback((e)=>{
        if (e.key === "Escape") onClose();
    }, [onClose]);

    useEffect(()=>{
        window.addEventListener("keydown", onKey);

        return ()=> window.removeEventListener("keydown", onKey);
    }, [onKey]);

    useFocusTrap(ref);
    return createPortal(
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-container" aria-modal="true" tabIndex="-1" role="dialog" aria-labelledby="modal-title" ref={ref} onClick={(e)=>e.stopPropagation()}>
                <header className="modal-header">
                    <h2 id="modal-title">{title}</h2>
                    <button aria-label="Close" onClick={onClose}> 
                        <FaTimes aria-hidden="true" />
                    </button>
                </header>
                <div className="modal-child">
                    {children}
                </div>
                <footer className="modal-footer">
                    <button type="button" aria-label="Save" onClick={onSave}>Save </button>
                    <button type="button" aria-label="Cancel" onClick={onClose}>Cancel </button>
                </footer>
            </div>
        </div>
    );
}
