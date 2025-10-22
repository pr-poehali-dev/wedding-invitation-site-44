import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const weddingDate = new Date('2025-06-15T15:00:00');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = weddingDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

      const sections = ['home', 'story', 'calendar', 'venue', 'map', 'schedule', 'dresscode', 'countdown', 'questions', 'closing'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (name && email && message) {
      toast.success('Спасибо! Ваше сообщение отправлено', {
        description: 'Мы свяжемся с вами в ближайшее время',
      });
      e.currentTarget.reset();
    }
  };

  const scheduleItems = [
    { time: '15:00', title: 'Регистрация гостей', icon: 'Users' },
    { time: '15:30', title: 'Церемония бракосочетания', icon: 'Heart' },
    { time: '16:30', title: 'Фотосессия', icon: 'Camera' },
    { time: '17:00', title: 'Праздничный банкет', icon: 'Utensils' },
    { time: '19:00', title: 'Первый танец', icon: 'Music' },
    { time: '20:00', title: 'Развлечения и танцы', icon: 'Sparkles' },
  ];

  return (
    <div className="min-h-screen scroll-smooth">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6 overflow-x-auto">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'schedule', label: 'Программа', icon: 'Calendar' },
                { id: 'venue', label: 'Место', icon: 'MapPin' },
                { id: 'dresscode', label: 'Дресс-код', icon: 'Shirt' },
                { id: 'questions', label: 'Вопросы', icon: 'MessageCircle' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex flex-col items-center gap-1 text-xs transition-colors ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span className="hidden sm:inline whitespace-nowrap">{item.label}</span>
                </button>
              ))}
            </div>
            {showScrollTop && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => scrollToSection('home')}
                className="ml-auto"
              >
                <Icon name="ArrowUp" size={18} />
              </Button>
            )}
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 animate-fade-in">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl mb-4 text-foreground">
            Александр<br />& Екатерина
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            Приглашаем вас на нашу свадьбу
          </p>
          <div className="w-24 h-0.5 bg-primary mx-auto animate-scale-in"></div>
        </div>
      </section>

      <section id="story" className="py-20 px-4 bg-muted/30 animate-fade-in-up">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl mb-6">Наша история</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Мы встретились тёплым летним вечером в старом книжном магазине. Оба тянулись за одной и той же книгой. 
            Тот случайный момент стал началом нашей удивительной истории любви. Сегодня мы приглашаем вас 
            разделить с нами самый важный день в нашей жизни.
          </p>
        </div>
      </section>

      <section id="calendar" className="py-20 px-4 animate-fade-in-up">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl mb-8">Дата свадьбы</h2>
          <div className="mb-8">
            <div className="font-serif text-7xl sm:text-8xl md:text-9xl text-primary mb-4">15</div>
            <div className="text-2xl sm:text-3xl font-medium mb-2">Июня 2025</div>
            <div className="text-lg text-muted-foreground">Воскресенье</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Церемония</div>
              <div className="text-xl font-medium">15:30</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Банкет</div>
              <div className="text-xl font-medium">17:00</div>
            </Card>
          </div>
          <Button className="mt-8" size="lg">
            <Icon name="Calendar" className="mr-2" size={18} />
            Добавить в календарь
          </Button>
        </div>
      </section>

      <section id="venue" className="py-20 px-4 bg-muted/30 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl mb-6 text-center">Место проведения</h2>
          <Card className="overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Icon name="Castle" size={64} className="text-primary/40" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-serif mb-3">Усадьба «Золотой ключ»</h3>
              <p className="text-muted-foreground mb-4">
                Живописная усадьба в окружении вековых дубов и цветущих садов. 
                Идеальное место для празднования самого важного события в нашей жизни.
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="MapPin" size={16} className="mr-2" />
                <span>Московская область, Истринский район</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="map" className="py-20 px-4 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl mb-8 text-center">Как добраться</h2>
          <Card className="overflow-hidden">
            <div className="h-80 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
              <Icon name="Map" size={64} className="text-primary/40" />
            </div>
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Icon name="MapPin" size={20} className="text-primary mt-1" />
                <div className="flex-1">
                  <div className="font-medium mb-1">Адрес</div>
                  <div className="text-sm text-muted-foreground">
                    143500, Московская область, Истринский район, д. Лучинское
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="Copy" size={16} />
                </Button>
              </div>
              <Button className="w-full" size="lg">
                <Icon name="Navigation" className="mr-2" size={18} />
                Проложить маршрут
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section id="schedule" className="py-20 px-4 bg-muted/30 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl mb-12 text-center">Программа дня</h2>
          <div className="space-y-6">
            {scheduleItems.map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-20 text-right">
                  <div className="text-lg font-medium text-primary">{item.time}</div>
                </div>
                <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={item.icon} size={20} className="text-primary" />
                  </div>
                  {index < scheduleItems.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-12 bg-border"></div>
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="dresscode" className="py-20 px-4 animate-fade-in-up">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl mb-8 text-center">Дресс-код</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Мы будем рады видеть вас в элегантных нарядах пастельных тонов. 
            Предпочтительные цвета: бежевый, пудрово-розовый, небесно-голубой, мятный
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="User" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-serif">Для мужчин</h3>
              </div>
              <p className="text-muted-foreground">
                Классический костюм светлых оттенков, белая или пастельная рубашка, 
                галстук или бабочка в тон общей палитре
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="UserRound" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-serif">Для женщин</h3>
              </div>
              <p className="text-muted-foreground">
                Коктейльное или вечернее платье пастельных тонов длиной до колена или в пол, 
                удобная обувь для танцев
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="countdown" className="py-20 px-4 bg-muted/30 animate-fade-in-up">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl mb-8">До встречи осталось</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: timeLeft.days, label: 'Дней' },
              { value: timeLeft.hours, label: 'Часов' },
              { value: timeLeft.minutes, label: 'Минут' },
              { value: timeLeft.seconds, label: 'Секунд' },
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <div className="font-serif text-4xl sm:text-5xl text-primary mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </Card>
            ))}
          </div>
          <p className="text-lg text-muted-foreground italic">
            Мы с нетерпением ждём этого дня вместе с вами!
          </p>
        </div>
      </section>

      <section id="questions" className="py-20 px-4 animate-fade-in-up">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl mb-8 text-center">Остались вопросы?</h2>
          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Ваше имя
                </label>
                <Input id="name" name="name" placeholder="Иван Иванов" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input id="email" name="email" type="email" placeholder="ivan@example.com" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Ваш вопрос
                </label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Напишите ваш вопрос..." 
                  rows={4}
                  required 
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                <Icon name="Send" className="mr-2" size={18} />
                Отправить
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section id="closing" className="py-20 px-4 bg-muted/30 animate-fade-in-up">
        <div className="max-w-2xl mx-auto text-center">
          <Icon name="Heart" size={48} className="text-primary mx-auto mb-6" />
          <h2 className="font-serif text-3xl sm:text-4xl mb-6">
            Спасибо, что разделите с нами этот день!
          </h2>
          <p className="text-muted-foreground mb-8">
            Ваше присутствие — лучший подарок для нас
          </p>
          <div className="space-y-2 mb-8">
            <div className="flex items-center justify-center gap-2">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className="text-sm">+7 (999) 123-45-67</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <span className="text-sm">wedding@example.com</span>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="Instagram" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Facebook" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Share2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Александр & Екатерина</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
