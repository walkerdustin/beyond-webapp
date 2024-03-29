export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      documents: {
        Row: {
          created_at: string | null
          document_id: string | null
          id: number
          owning_user_uuid: string | null
        }
        Insert: {
          created_at?: string | null
          document_id?: string | null
          id?: number
          owning_user_uuid?: string | null
        }
        Update: {
          created_at?: string | null
          document_id?: string | null
          id?: number
          owning_user_uuid?: string | null
        }
      }
      family_members: {
        Row: {
          created_at: string | null
          family_of_user: string | null
          first_name: string | null
          id: number
          inheritance_quota: number
          last_name: string | null
          relation: string | null
        }
        Insert: {
          created_at?: string | null
          family_of_user?: string | null
          first_name?: string | null
          id?: number
          inheritance_quota?: number
          last_name?: string | null
          relation?: string | null
        }
        Update: {
          created_at?: string | null
          family_of_user?: string | null
          first_name?: string | null
          id?: number
          inheritance_quota?: number
          last_name?: string | null
          relation?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      testament_gen_question_answers: {
        Row: {
          chosen_option: number | null
          created_at: string | null
          question_id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          chosen_option?: number | null
          created_at?: string | null
          question_id: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          chosen_option?: number | null
          created_at?: string | null
          question_id?: number
          updated_at?: string | null
          user_id?: string
        }
      }
      testament_gen_questions: {
        Row: {
          created_at: string | null
          id: number
          id_in_mermaid: string | null
          name_of_question: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          id_in_mermaid?: string | null
          name_of_question?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          id_in_mermaid?: string | null
          name_of_question?: string | null
        }
      }
      vermachtnisse: {
        Row: {
          created_at: string | null
          estimated_value: number | null
          id: number
          to_family_member: number
          vermachtnis_item: string
          vermachtnis_of_user: string
          vorausvermachtnis: boolean
        }
        Insert: {
          created_at?: string | null
          estimated_value?: number | null
          id?: number
          to_family_member: number
          vermachtnis_item: string
          vermachtnis_of_user: string
          vorausvermachtnis?: boolean
        }
        Update: {
          created_at?: string | null
          estimated_value?: number | null
          id?: number
          to_family_member?: number
          vermachtnis_item?: string
          vermachtnis_of_user?: string
          vorausvermachtnis?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_planet: {
        Args: {
          name: string
        }
        Returns: number
      }
      hello_world: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      upsert_answer: {
        Args: {
          question_id_input: number
          user_id_input: string
          chosen_option_input: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
