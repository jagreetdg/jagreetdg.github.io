import { WaveBackground } from "./WaveBackground";
import { RippleEffect } from "./RippleEffect";

export const BackgroundLayer = () => {
	return (
		<>
			{/* Wave Background */}
			<div className="opacity-90">
				<WaveBackground />
			</div>

			{/* Ripple Effects */}
			<div className="absolute inset-0 pointer-events-none opacity-15">
				<RippleEffect count={2} color="#4338CA" />
				<div className="absolute top-1/3 left-1/5 w-32 h-32 opacity-30">
					<RippleEffect count={1} color="#6D28D9" />
				</div>
				<div className="absolute bottom-1/4 right-1/5 w-24 h-24 opacity-25">
					<RippleEffect count={1} color="#5B21B6" />
				</div>
			</div>
		</>
	);
};
