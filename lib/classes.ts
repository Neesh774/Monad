export default function classes(...classes) {
	return classes.filter(Boolean).join(' ');
}
