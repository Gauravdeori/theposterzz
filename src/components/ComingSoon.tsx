import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Mail, ArrowRight, User, Phone, Sun, Moon, Heart, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg-light.png";
import post1 from "@/assets/posts/1.png";
import post2 from "@/assets/posts/2.png";
import post3 from "@/assets/posts/3.png";
import post4 from "@/assets/posts/4.png";
import post5 from "@/assets/posts/5.png";

const igPosts = [
  { id: 1, img: post1, likes: "1.2k", comments: "48" },
  { id: 2, img: post2, likes: "892", comments: "34" },
  { id: 3, img: post3, likes: "2.1k", comments: "128" },
  { id: 4, img: post4, likes: "1.5k", comments: "89" },
  { id: 5, img: post5, likes: "956", comments: "56" },
  { id: 6, img: post1, likes: "3.4k", comments: "210" },
  { id: 7, img: post2, likes: "743", comments: "22" },
  { id: 8, img: post3, likes: "1.8k", comments: "94" },
  { id: 9, img: post4, likes: "2.5k", comments: "156" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { 
    duration: 0.8, 
    delay, 
    ease: [0.23, 1, 0.32, 1] as [number, number, number, number] 
  },
});

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const ComingSoon = () => {
  const [dark, setDark] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: "New Lead from THEPOSTERZZ Launchpad",
          from_name: "THEPOSTERZZ Launchpad",
          message: `New subscriber details:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        toast({ title: "You're in! 🎉", description: "Welcome to the poster revolution." });
      } else {
        toast({
          variant: "destructive",
          title: "Submission failed",
          description: result.message || "Please check your Access Key or try again later.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Something went wrong. Please check your internet and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img src={heroBg} alt="" className="w-full h-full object-cover scale-105" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/60 to-background/95 dark:from-background/40 dark:via-background/50 dark:to-background/90" />
      </div>

      {/* Theme toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setDark(!dark)}
        className="fixed top-5 right-5 z-50 p-3 rounded-full bg-card/80 backdrop-blur-md border border-border shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle theme"
      >
        {dark ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
      </motion.button>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-5 py-16 md:py-20 max-w-4xl mx-auto">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.6 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          className="mb-8"
        >
          <img src={logo} alt="THEPOSTERZZ" className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_25px_hsl(263,70%,52%,0.4)]" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.15)}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] sm:leading-[0.9] text-center text-foreground"
        >
          Something Big
          <br />
          <span className="text-primary text-glow font-extrabold italic">is Coming.</span>
        </motion.h1>

        <motion.p {...fadeUp(0.3)} className="text-muted-foreground text-base md:text-lg max-w-lg text-center mt-5 leading-relaxed">
          We're redefining your space with posters that match your vibe.
        </motion.p>

        <motion.p {...fadeUp(0.4)} className="text-muted-foreground/60 text-sm italic tracking-wide mt-2">
          "Every wall deserves our Posterzz."
        </motion.p>

        <motion.div {...fadeUp(0.45)} className="mt-6 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-primary">
          Launching Soon 🚀
        </motion.div>

        {/* Action Buttons */}
        <motion.div {...fadeUp(0.55)} className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-10 w-full sm:w-auto px-4 sm:px-0">
          <a
            href="https://www.instagram.com/theposterzz.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-shimmer group relative inline-flex items-center justify-center gap-3 bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] text-white rounded-2xl px-8 py-4 text-sm font-bold transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(214,36,159,0.3)] shadow-xl w-full sm:w-auto text-center"
          >
            <InstagramIcon className="w-5 h-5" />
            Follow @theposterzz.in
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="https://amzn.in/d/08KbGHFg"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 bg-[#232F3E] text-white rounded-2xl px-8 py-4 text-sm font-bold transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(35,47,62,0.3)] shadow-xl w-full sm:w-auto text-center"
          >
            <ShoppingBag className="w-5 h-5 text-[#FF9900]" />
            Shop on Amazon
            <ArrowRight className="w-4 h-4 text-[#FF9900] transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Instagram Mini Browser */}
        <motion.div {...fadeUp(0.65)} className="mt-16 sm:mt-24 w-full lg:max-w-5xl">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/40 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] bg-white/40 backdrop-blur-2xl transition-transform duration-700 hover:rotate-1 hover:scale-[1.01]">
            {/* Browser chrome bar */}
            <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/20 bg-white/40">
              <div className="flex gap-1.5 sm:gap-2">
                <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#FF5F57] shadow-inner" />
                <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#FFBD2E] shadow-inner" />
                <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#28C840] shadow-inner" />
              </div>
              <div className="flex-1 mx-3 sm:mx-6">
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 bg-white/50 border border-black/5 rounded-xl px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm text-foreground/60 shadow-inner">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 shrink-0 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span className="truncate font-medium max-w-[120px] sm:max-w-none">instagram.com/theposterzz.in</span>
                </div>
              </div>
              <a
                href="https://www.instagram.com/theposterzz.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
              >
                <span className="hidden sm:inline">Visit Profile</span>
                <span className="sm:hidden">Open</span> ↗
              </a>
            </div>
            {/* Scrollable feed area */}
            <div className="h-[350px] sm:h-[450px] md:h-[550px] overflow-y-auto scrollbar-none bg-white/20">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5 sm:gap-2 p-0.5 sm:p-2">
                {igPosts.map((post) => (
                  <a
                    key={post.id}
                    href="https://www.instagram.com/theposterzz.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group aspect-square overflow-hidden bg-white/50 block rounded-lg"
                  >
                    <img
                      src={post.img}
                      alt={`Instagram post ${post.id}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                      <div className="flex items-center gap-2 text-white font-bold">
                        <Heart className="w-6 h-6 fill-white" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white font-bold">
                        <MessageCircle className="w-6 h-6 fill-white" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-foreground/40 text-sm mt-6 font-medium italic">
            @theposterzz.in — Trending Posters for the Gen Z Vibe
          </p>
        </motion.div>

        {/* Join the Revolution Form */}
        <motion.div {...fadeUp(0.8)} className="mt-16 sm:mt-24 w-full max-w-lg">
          <div className="glass-light rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden group mx-4 sm:mx-0">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/10 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150" />
            
            <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-center text-foreground mb-2">
              Join the <span className="text-primary italic">Revolution</span>
            </h2>
            <p className="text-foreground/60 text-xs sm:text-sm md:text-base text-center mb-10 font-medium">
              Be the first to know when we launch our exclusive drops.
            </p>

            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    required
                    maxLength={100}
                    className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/50 border border-black/5 text-sm md:text-base text-foreground placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email Address"
                    required
                    maxLength={255}
                    className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/50 border border-black/5 text-sm md:text-base text-foreground placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone Number"
                    required
                    maxLength={15}
                    pattern="[0-9+\-\s]{7,15}"
                    className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/50 border border-black/5 text-sm md:text-base text-foreground placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-base md:text-lg tracking-wider transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(124,58,237,0.4)] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? "Sending... 🚀" : "Notify Me 🚀"}
                    {!isSubmitting && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                  </span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <p className="text-2xl mb-2">🎉</p>
                <p className="font-display font-bold text-lg text-foreground">You're in!</p>
                <p className="text-muted-foreground text-sm mt-1">We'll notify you when we launch.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer {...fadeUp(0.9)} className="mt-14 text-center text-muted-foreground/50 text-xs space-y-1 pb-8">
          <p>© 2026 THEPOSTERZZ. All rights reserved.</p>
          <p>Every wall deserves our Posterzz.</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default ComingSoon;
