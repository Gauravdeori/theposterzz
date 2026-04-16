import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Mail, ArrowRight, User, Phone, Sun, Moon, Heart, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";
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
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const ComingSoon = () => {
  const [dark, setDark] = useState(true);
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
          className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tight leading-tight text-center text-foreground"
        >
          Something Big
          <br />
          <span className="text-primary text-glow">is Coming.</span>
        </motion.h1>

        <motion.p {...fadeUp(0.3)} className="text-muted-foreground text-base md:text-lg max-w-lg text-center mt-5 leading-relaxed">
          We're redefining your space with posters that match your vibe.
        </motion.p>

        <motion.p {...fadeUp(0.4)} className="text-muted-foreground/60 text-sm italic tracking-wide mt-2">
          "Every wall deserves our Posterzz."
        </motion.p>

        <motion.div {...fadeUp(0.45)} className="mt-5 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold tracking-widest uppercase text-primary">
          Launching Soon 🚀
        </motion.div>

        {/* Action Buttons */}
        <motion.div {...fadeUp(0.55)} className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="https://www.instagram.com/theposterzz.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 bg-instagram text-instagram-foreground rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(330,80%,55%,0.4)]"
          >
            <InstagramIcon className="w-4 h-4" />
            Follow @theposterzz.in
            <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
          </a>
          <a
            href="https://amzn.in/d/08KbGHFg"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 bg-amazon text-amazon-foreground rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(40,90%,50%,0.4)]"
          >
            <ShoppingBag className="w-4 h-4" />
            Shop on Amazon
            <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
          </a>
        </motion.div>

        {/* Instagram Mini Browser */}
        <motion.div {...fadeUp(0.65)} className="mt-14 w-full">
          <div className="rounded-2xl overflow-hidden border border-border shadow-2xl bg-card/90 backdrop-blur-xl">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card/95">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <span className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 mx-3">
                <div className="flex items-center gap-2 bg-secondary/60 rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
                  <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span className="truncate">instagram.com/theposterzz.in</span>
                </div>
              </div>
              <a
                href="https://www.instagram.com/theposterzz.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-primary hover:underline whitespace-nowrap"
              >
                Open ↗
              </a>
            </div>
            {/* Scrollable feed area */}
            <div className="h-[400px] md:h-[480px] overflow-y-auto scrollbar-thin bg-background">
              <div className="grid grid-cols-3 gap-0.5 md:gap-1 p-0.5 md:p-1">
                {igPosts.map((post) => (
                  <a
                    key={post.id}
                    href="https://www.instagram.com/theposterzz.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group aspect-square overflow-hidden bg-muted block"
                  >
                    <img
                      src={post.img}
                      alt={`Instagram post ${post.id}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1.5 text-white font-bold">
                        <Heart className="w-5 h-5 fill-white" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white font-bold">
                        <MessageCircle className="w-5 h-5 fill-white" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-muted-foreground text-xs mt-3">
            @theposterzz.in — Anime · Movies · Cricket · Music · Motivation
          </p>
        </motion.div>

        {/* Join the Revolution Form */}
        <motion.div {...fadeUp(0.8)} className="mt-14 w-full max-w-md">
          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8 shadow-2xl">
            <h2 className="font-display font-bold text-xl md:text-2xl text-center text-foreground mb-1">
              Join the <span className="text-primary">Revolution</span> of Posters
            </h2>
            <p className="text-muted-foreground text-sm text-center mb-6">
              Be the first to know when we launch. No spam, ever.
            </p>

            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    required
                    maxLength={100}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email"
                    required
                    maxLength={255}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your Phone Number"
                    required
                    maxLength={15}
                    pattern="[0-9+\-\s]{7,15}"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] hover:box-glow-hover box-glow disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending... 🚀" : "Notify Me 🚀"}
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
