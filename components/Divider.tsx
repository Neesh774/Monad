import styles from 'styles/divider.module.scss';

export default function Divider({ foreground = false }: { foreground?: boolean }) {
	const fill = foreground ? 'var(--background)' : 'var(--foreground)';

	return (
		<div className={styles.divider}>
			<svg
				data-name='divider'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 1200 120'
				preserveAspectRatio='none'
				style={foreground ? { transform: 'rotateY(0deg)' } : {}}>
				<path d='M1200 120L0 16.48 0 0 1200 0 1200 120z' fill={fill} />
			</svg>
		</div>
	);
}
