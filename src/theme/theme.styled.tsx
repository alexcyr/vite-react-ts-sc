/* eslint-disable @typescript-eslint/no-explicit-any */
import { css, DefaultTheme } from "styled-components";

export const MEDIA_WIDTHS = {
	xs: 450,
	sm: 500,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1600,
};

const mediaWidthTemplates: {
	[width in keyof typeof MEDIA_WIDTHS]: typeof css;
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
	(accumulator as any)[size] = (one: any, two: any, three: any) => css`
		@media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
			${css(one, two, three)}
		}
	`;
	return accumulator;
}, {}) as any;

export function theme(): DefaultTheme {
	return {
		// media queries
		mediaWidth: mediaWidthTemplates,

		// css snippets
		flexColumnNoWrap: css`
			display: flex;
			flex-flow: column nowrap;
		`,
		flexRowNoWrap: css`
			display: flex;
			flex-flow: row nowrap;
		`,
		flexCenter: css`
			display: flex;
			align-items: center;
			justify-content: center;
		`,

		// add page margins
		pageWidth: css`
			max-width: 1600px;
			margin: 0 auto;
			padding: 0 80px;

			${mediaWidthTemplates.xl`
                padding: 0 80px;
            `}

			${mediaWidthTemplates.lg`
                padding: 0 60px;
            `}

            ${mediaWidthTemplates.md`
                padding: 0 50px;
            `}

            ${mediaWidthTemplates.sm`
                padding: 0 40px;
            `}

            ${mediaWidthTemplates.xs`
                padding: 0 20px;
            `}
		`,
	};
}
