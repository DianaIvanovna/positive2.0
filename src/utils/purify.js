import DOMPurify from "dompurify";

export const purify = value => DOMPurify.sanitize(value);
