'use client';

import React from 'react';
import { MonitorCogIcon, MoonStarIcon, SunIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

/**
 * Opções de tema disponíveis para o seletor
 */
const THEME_OPTIONS = [
	{
		icon: MonitorCogIcon,
		value: 'system',
	},
	{
		icon: SunIcon,
		value: 'light',
	},
	{
		icon: MoonStarIcon,
		value: 'dark',
	},
];

/**
 * Componente ToggleTheme - Seletor de tema com três opções
 * Permite alternar entre temas claro, escuro e sistema
 * @param layout - Layout do componente ('default' ou 'card')
 */
export function ToggleTheme({ layout = 'default' }: { layout?: 'default' | 'card' }) {
	const { theme, setTheme } = useTheme();

	// Estado para controlar se o componente foi montado (evita hidratação mismatch)
	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	// Renderiza placeholder enquanto não está montado
	if (!isMounted) {
		return layout === 'card' ? <div className="h-9 w-24" /> : <div className="flex h-8 w-24" />;
	}

	return (
		<motion.div
			key={String(isMounted)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className="bg-muted/80 inline-flex items-center overflow-hidden rounded-md border p-1 md:p-0"
			role="radiogroup"
		>
			{THEME_OPTIONS.map((option) => (
				<button
					key={option.value}
					className={cn(
						'relative flex cursor-pointer items-center justify-center rounded-md transition-all',
						layout === 'card' ? 'h-9 w-9 md:h-8 md:w-8' : 'h-10 w-10 md:h-8 md:w-8',
						theme === option.value
							? 'text-foreground'
							: 'text-muted-foreground hover:text-foreground',
					)}
					role="radio"
					aria-checked={theme === option.value}
					aria-label={`Switch to ${option.value} theme`}
					onClick={() => setTheme(option.value)}
				>
					{/* Indicador visual do tema ativo */}
					{theme === option.value && (
						<motion.div
							transition={{ type: 'spring', bounce: 0.1, duration: 0.75 }}
							className={cn(
								'border-muted-foreground/50 absolute inset-0 rounded-md border',
								layout === 'card' ? 'ring-2 ring-primary/20' : '',
							)}
						/>
					)}
					<option.icon className={layout === 'card' ? 'h-5 w-5 md:h-4 md:w-4' : 'h-5 w-5 md:h-4 md:w-4'} />
				</button>
			))}
		</motion.div>
	);
}
