export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      blog_tags: {
        Row: { blog_id: string; tag_id: string };
        Insert: { blog_id: string; tag_id: string };
        Update: { blog_id?: string; tag_id?: string };
        Relationships: [];
      };
      blogs: {
        Row: {
          author: string | null;
          category_id: string | null;
          content: string | null;
          created_at: string;
          excerpt: string | null;
          featured_image: string | null;
          id: string;
          meta_description: string | null;
          meta_title: string | null;
          published_at: string | null;
          slug: string;
          status: Database["public"]["Enums"]["content_status"];
          title: string;
          updated_at: string;
          views: number;
        };
        Insert: {
          author?: string | null;
          category_id?: string | null;
          content?: string | null;
          created_at?: string;
          excerpt?: string | null;
          featured_image?: string | null;
          id?: string;
          meta_description?: string | null;
          meta_title?: string | null;
          published_at?: string | null;
          slug: string;
          status?: Database["public"]["Enums"]["content_status"];
          title: string;
          updated_at?: string;
          views?: number;
        };
        Update: Partial<Database["public"]["Tables"]["blogs"]["Insert"]>;
        Relationships: [];
      };
      categories: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          kind: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          kind?: string;
          name: string;
          slug: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
        Relationships: [];
      };
      consultants: {
        Row: {
          booking_link: string | null;
          created_at: string;
          description: string | null;
          designation: string | null;
          experience: string | null;
          id: string;
          languages: string[];
          name: string;
          photo_url: string | null;
          position: number;
          specialization: string[];
          status: Database["public"]["Enums"]["content_status"];
          updated_at: string;
          whatsapp: string | null;
        };
        Insert: {
          booking_link?: string | null;
          created_at?: string;
          description?: string | null;
          designation?: string | null;
          experience?: string | null;
          id?: string;
          languages?: string[];
          name: string;
          photo_url?: string | null;
          position?: number;
          specialization?: string[];
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
          whatsapp?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["consultants"]["Insert"]>;
        Relationships: [];
      };
      contacts: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          message: string;
          name: string;
          phone: string | null;
          status: Database["public"]["Enums"]["contact_status"];
          subject: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: string;
          message: string;
          name: string;
          phone?: string | null;
          status?: Database["public"]["Enums"]["contact_status"];
          subject?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["contacts"]["Insert"]>;
        Relationships: [];
      };
      courses: {
        Row: {
          created_at: string;
          description: string | null;
          duration: string | null;
          id: string;
          image_url: string | null;
          instructor: string | null;
          languages: string[];
          level: string | null;
          pdf_url: string | null;
          position: number;
          price: string | null;
          slug: string;
          status: Database["public"]["Enums"]["content_status"];
          syllabus: Json;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          duration?: string | null;
          id?: string;
          image_url?: string | null;
          instructor?: string | null;
          languages?: string[];
          level?: string | null;
          pdf_url?: string | null;
          position?: number;
          price?: string | null;
          slug: string;
          status?: Database["public"]["Enums"]["content_status"];
          syllabus?: Json;
          title: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["courses"]["Insert"]>;
        Relationships: [];
      };
      events: {
        Row: {
          created_at: string;
          description: string | null;
          event_date: string | null;
          id: string;
          image_url: string | null;
          is_published: boolean;
          location: string | null;
          position: number;
          slug: string;
          status: Database["public"]["Enums"]["event_status"];
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          event_date?: string | null;
          id?: string;
          image_url?: string | null;
          is_published?: boolean;
          location?: string | null;
          position?: number;
          slug: string;
          status?: Database["public"]["Enums"]["event_status"];
          title: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
        Relationships: [];
      };
      faq: {
        Row: {
          answer: string | null;
          category: string | null;
          created_at: string;
          id: string;
          position: number;
          question: string;
          status: Database["public"]["Enums"]["content_status"];
        };
        Insert: {
          answer?: string | null;
          category?: string | null;
          created_at?: string;
          id?: string;
          position?: number;
          question: string;
          status?: Database["public"]["Enums"]["content_status"];
        };
        Update: Partial<Database["public"]["Tables"]["faq"]["Insert"]>;
        Relationships: [];
      };
      gallery: {
        Row: {
          category: string | null;
          created_at: string;
          id: string;
          is_featured: boolean;
          media_id: string | null;
          position: number;
          status: Database["public"]["Enums"]["content_status"];
          thumbnail: string | null;
          title: string | null;
          type: Database["public"]["Enums"]["media_type"];
          url: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          id?: string;
          is_featured?: boolean;
          media_id?: string | null;
          position?: number;
          status?: Database["public"]["Enums"]["content_status"];
          thumbnail?: string | null;
          title?: string | null;
          type?: Database["public"]["Enums"]["media_type"];
          url: string;
        };
        Update: Partial<Database["public"]["Tables"]["gallery"]["Insert"]>;
        Relationships: [];
      };
      media: {
        Row: {
          alt: string | null;
          created_at: string;
          folder: string | null;
          height: number | null;
          id: string;
          public_id: string | null;
          title: string | null;
          type: Database["public"]["Enums"]["media_type"];
          url: string;
          width: number | null;
        };
        Insert: {
          alt?: string | null;
          created_at?: string;
          folder?: string | null;
          height?: number | null;
          id?: string;
          public_id?: string | null;
          title?: string | null;
          type?: Database["public"]["Enums"]["media_type"];
          url: string;
          width?: number | null;
        };
        Update: Partial<Database["public"]["Tables"]["media"]["Insert"]>;
        Relationships: [];
      };
      pages: {
        Row: {
          created_at: string;
          id: string;
          is_system: boolean;
          position: number;
          slug: string;
          status: Database["public"]["Enums"]["content_status"];
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_system?: boolean;
          position?: number;
          slug: string;
          status?: Database["public"]["Enums"]["content_status"];
          title: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["pages"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string | null;
          full_name: string | null;
          id: string;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      sections: {
        Row: {
          content: Json;
          created_at: string;
          id: string;
          is_visible: boolean;
          name: string | null;
          page_id: string;
          position: number;
          styles: Json;
          type: string;
          updated_at: string;
        };
        Insert: {
          content?: Json;
          created_at?: string;
          id?: string;
          is_visible?: boolean;
          name?: string | null;
          page_id: string;
          position?: number;
          styles?: Json;
          type: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["sections"]["Insert"]>;
        Relationships: [];
      };
      seo: {
        Row: {
          id: string;
          keywords: string[];
          meta_description: string | null;
          meta_title: string | null;
          og_image: string | null;
          path: string;
          structured_data: Json | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          keywords?: string[];
          meta_description?: string | null;
          meta_title?: string | null;
          og_image?: string | null;
          path: string;
          structured_data?: Json | null;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["seo"]["Insert"]>;
        Relationships: [];
      };
      services: {
        Row: {
          created_at: string;
          description: string | null;
          features: string[];
          icon: string | null;
          id: string;
          image_url: string | null;
          position: number;
          slug: string;
          status: Database["public"]["Enums"]["content_status"];
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          features?: string[];
          icon?: string | null;
          id?: string;
          image_url?: string | null;
          position?: number;
          slug: string;
          status?: Database["public"]["Enums"]["content_status"];
          title: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
        Relationships: [];
      };
      settings: {
        Row: {
          group: string;
          key: string;
          label: string | null;
          type: string;
          updated_at: string;
          value: Json;
        };
        Insert: {
          group?: string;
          key: string;
          label?: string | null;
          type?: string;
          updated_at?: string;
          value?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["settings"]["Insert"]>;
        Relationships: [];
      };
      tags: {
        Row: { created_at: string; id: string; name: string; slug: string };
        Insert: { created_at?: string; id?: string; name: string; slug: string };
        Update: Partial<Database["public"]["Tables"]["tags"]["Insert"]>;
        Relationships: [];
      };
      testimonials: {
        Row: {
          avatar_url: string | null;
          content: string;
          created_at: string;
          id: string;
          name: string;
          position: number;
          rating: number;
          role: string | null;
          status: Database["public"]["Enums"]["content_status"];
        };
        Insert: {
          avatar_url?: string | null;
          content: string;
          created_at?: string;
          id?: string;
          name: string;
          position?: number;
          rating?: number;
          role?: string | null;
          status?: Database["public"]["Enums"]["content_status"];
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
      is_staff: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: {
      contact_status: "new" | "read" | "replied" | "archived";
      content_status: "draft" | "published" | "archived";
      event_status: "upcoming" | "ongoing" | "past";
      media_type: "image" | "video";
      user_role: "admin" | "editor" | "viewer";
    };
    CompositeTypes: { [_ in never]: never };
  };
};

type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Row"];
export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Update"];
export type Enums<T extends keyof PublicSchema["Enums"]> =
  PublicSchema["Enums"][T];

// Convenience row aliases
export type Setting = Tables<"settings">;
export type Page = Tables<"pages">;
export type Section = Tables<"sections">;
export type Service = Tables<"services">;
export type Course = Tables<"courses">;
export type Consultant = Tables<"consultants">;
export type GalleryItem = Tables<"gallery">;
export type MediaItem = Tables<"media">;
export type Blog = Tables<"blogs">;
export type Category = Tables<"categories">;
export type Tag = Tables<"tags">;
export type EventItem = Tables<"events">;
export type Testimonial = Tables<"testimonials">;
export type Faq = Tables<"faq">;
export type Contact = Tables<"contacts">;
export type Profile = Tables<"profiles">;
