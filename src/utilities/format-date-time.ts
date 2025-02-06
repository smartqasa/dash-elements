import { html, TemplateResult } from 'lit';

export const formattedDate = (date: Date = new Date()): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
};

export const formattedTime = (date: Date = new Date()): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes}`;
};

export const formattedTimeBlink = (date: Date = new Date()): TemplateResult => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const opacity = seconds % 2 === 0 ? '1' : '0';

    return html`
        <span>${hours % 12 || 12}</span>
        <span style="opacity: ${opacity};">:</span>
        <span>${minutes < 10 ? '0' + minutes : minutes}</span>
    `;
};
