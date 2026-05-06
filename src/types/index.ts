export type UserType = 'client' | 'admin';

export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  user_type: UserType;
  company_name?: string;
  siret?: string;
  language: string;
  notifications_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export type ShipmentType = 'colis' | 'lettre' | 'high-tech' | 'terroir' | 'encombrant';
export type ShipmentStatus = 'devis' | 'en_attente' | 'approuve' | 'paye' | 'en_preparation' | 'en_transit' | 'livre' | 'annule';

export interface Shipment {
  id: string;
  user_id: string;
  sender_name: string;
  sender_email: string;
  sender_phone: string;
  sender_address: string;
  recipient_name: string;
  recipient_email: string;
  recipient_phone: string;
  recipient_address: string;
  type: ShipmentType;
  weight: number;
  dimensions?: string;
  description?: string;
  origin_city: string;
  destination_city: string;
  origin_country: string;
  destination_country: string;
  status: ShipmentStatus;
  price: number;
  currency: string;
  created_at: string;
  updated_at: string;
  shipped_at?: string;
  delivered_at?: string;
}

export interface Payment {
  id: string;
  shipment_id: string;
  stripe_session_id?: string;
  stripe_payment_intent_id?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  paid_at?: string;
  metadata?: Record<string, unknown>;
}

export interface TrackingUpdate {
  id: string;
  shipment_id: string;
  status: ShipmentStatus;
  location?: string;
  description?: string;
  updated_at: string;
  photo_url?: string;
}

export interface DevisFormData {
  type: ShipmentType;
  sender_name: string;
  sender_email: string;
  sender_phone: string;
  sender_address: string;
  sender_city: string;
  sender_country: string;
  recipient_name: string;
  recipient_email: string;
  recipient_phone: string;
  recipient_address: string;
  recipient_city: string;
  recipient_country: string;
  weight: number;
  dimensions: string;
  description: string;
}
