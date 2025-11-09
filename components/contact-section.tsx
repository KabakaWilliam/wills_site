import { Github, Linkedin } from "lucide-react";

export function ContactSection() {
  return (
    <section className="space-y-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Other ways to get in touch</h2>

          <div className="flex gap-4">
            <a
              href="https://github.com/KabakaWilliam"
              target="_blank"
              className="w-10 h-10 border border-border rounded flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/wlugoloobi/"
              target="_blank"
              className="w-10 h-10 border border-border rounded flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              <Linkedin size={20} />
            </a>
            {/* <a
              href="#"
              className="w-10 h-10 border border-border rounded flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              <Mail size={20} />
            </a> */}
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="w-40 h-40 md:w-48 md:h-48 bg-card border-2 border-border rounded overflow-hidden">
            <img
              src="/pika.png"
              alt="William Gitta Lugolobi"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
